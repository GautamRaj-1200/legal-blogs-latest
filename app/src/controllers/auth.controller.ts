import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import * as authService from '../services/auth.service.js';
import { signinSchema, signupSchema } from '../schemas/users.schema.js';
import config from '../config/config.js';
import { refreshAccessToken } from '../services/auth.service.js';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { ApiError } from '../utils/apiError.js';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = signupSchema.parse(req.body);
  const user = await authService.createUser(validatedData);
  ApiResponse.success(user, 'User registered successfully', 201).send(res);
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = signinSchema.parse(req.body);
  const { loggedInUser, accessToken, refreshToken } = await authService.loginUser(validatedData);

  // Set access and refresh token in cookie
  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: config.ENV === 'production', // only on HTTPS in production
      sameSite: 'none',
      maxAge: 60 * 1000, // 1 min
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.ENV === 'production', // only on HTTPS in production
      sameSite: 'none',
      maxAge: 2 * 60 * 1000, // 1 day
    });

  ApiResponse.success(loggedInUser, 'Login successful', 200).send(res);
});

export const newAccessToken = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  console.log('Inside new access token');
  const userId = req.user?._id;
  const accessToken = await refreshAccessToken(userId);
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.ENV === 'production', // only on HTTPS in production
    sameSite: 'none',
    maxAge: 60 * 1000, // 1 min
  });
  ApiResponse.success(null, 'Access Token refreshed successfully', 200).send(res);
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await authService.verifyOtpService(email, otp);
  ApiResponse.success(null, 'Email Verified Successfully', 200).send(res);
});

export const resendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await authService.resendOtpService(email);
  ApiResponse.success(result, 'OTP sent successfully', 200).send(res);
});

export const logoutUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, 'User ID is required to logout');
  }
  await authService.logoutUserService(userId);

  // Clear cookies
  res.clearCookie('accessToken').clearCookie('refreshToken');

  ApiResponse.success(null, 'User signed out successfully', 200).send(res);
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, 'Email is required');
  const result = await authService.forgotPasswordService(email);
  ApiResponse.success(result, 'OTP sent to email', 200).send(res);
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    throw new ApiError(400, 'Email, OTP, and new password are required');
  }
  const result = await authService.resetPasswordService(email, otp, newPassword);
  ApiResponse.success(result, 'Password reset successful', 200).send(res);
});
