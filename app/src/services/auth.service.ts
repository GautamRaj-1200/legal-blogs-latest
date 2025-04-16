import * as userRepo from '../repositories/users.repository.js';
import { SigninInput, SignupInput } from '../schemas/users.schema.js';
import { ApiError } from '../utils/apiError.js';
import { sendingEmail } from '../utils/sendOTP.js';
import crypto from 'crypto';

export const createUser = async (data: SignupInput) => {
  const { email } = data;
  const existingUser = await userRepo.findByEmail(email);

  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email');
  }

  const newUser = await userRepo.create(data);

  if (newUser) {
    try {
      const otp = crypto.randomInt(100000, 1000000);
      const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
      const info = await sendingEmail(
        newUser.email,
        'Verify your email',
        `<h3>Welcome ${newUser.firstName}!</h3><p>Your account has been created successfully. Please verify your email address. <strong>OTP:${otp}</strong></p>`
      );
      await userRepo.updateOtp(newUser._id, otp, otpExpiry);
      console.log(`Email sent to ${newUser.email}: ${info.response}`);
    } catch (error) {
      console.error(`Failed to send email to ${newUser.email}`, error);
    }
  }
  const createdUser = await userRepo.findById(
    newUser._id,
    '-password -refreshToken -isVerified -isActive -role -createdAt -updatedAt'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }
  return createdUser;
};

export const loginUser = async (data: SigninInput) => {
  const { email, password } = data;

  const user = await userRepo.findByEmail(email);

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordValid = await user.isPasswordValid(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid User Credentials');
  }

  const verified = user.isUserVerified();
  if (!verified) {
    throw new ApiError(403, 'User is not verified');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await userRepo.updateRefreshToken(user._id, refreshToken);

  const loggedInUser = await userRepo.findById(
    user._id,
    '-password -refreshToken -isVerified -isActive -role -createdAt -updatedAt'
  );
  return {
    loggedInUser,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (userId: string | undefined) => {
  if (!userId) {
    throw new ApiError(401, 'User ID is required to refresh access token');
  }

  const user = await userRepo.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const accessToken = user.generateAccessToken();
  return { accessToken };
};

export const verifyOtpService = async (email: string, otp: number) => {
  if (!email || !otp) {
    throw new ApiError(403, 'Email and otp should be provided');
  }
  const user = await userRepo.findByEmail(email);
  const now = new Date(Date.now());
  if (user?.otp !== otp || !user?.otpExpiry || user?.otpExpiry < now) {
    throw new ApiError(403, 'Invalid or expired OTP');
  }

  user.isVerified = true;
  user.isActive = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
};

export const resendOtpService = async (email: string) => {
  if (!email) {
    throw new ApiError(403, 'Email should be provided');
  }
  const user = await userRepo.findByEmail(email);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isVerified) {
    throw new ApiError(400, 'User is already verified');
  }

  const otp = crypto.randomInt(100000, 1000000);
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  try {
    const info = await sendingEmail(
      user.email,
      'Your new OTP',
      `<h3>Hello ${user.firstName}!</h3><p>Your new OTP is: <strong>${otp}</strong></p>`
    );

    await userRepo.updateOtp(user._id, otp, otpExpiry);
    console.log(`OTP re-sent to ${user.email}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to resend OTP to ${user.email}`, error);
    throw new ApiError(500, 'Failed to resend OTP');
  }

  return { message: 'OTP has been resent successfully' };
};

export const logoutUserService = async (userId: string) => {
  if (!userId) throw new ApiError(400, 'User ID is required to logout');
  await userRepo.clearRefreshToken(userId);
  return { message: 'Logged out successfully' };
};
