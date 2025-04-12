import * as userRepo from '../repositories/users.repository.js';
import { SigninInput, SignupInput } from '../schemas/users.schema.js';
import { ApiError } from '../utils/apiError.js';

export const createUser = async (data: SignupInput) => {
  const { email } = data;
  const existingUser = await userRepo.findByEmail(email);

  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email');
  }

  const newUser = await userRepo.create(data);
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

  const isPasswordValid = user.isPasswordValid(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid User Credentials');
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
