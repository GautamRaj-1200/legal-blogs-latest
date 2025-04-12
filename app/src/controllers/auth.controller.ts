import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import * as authService from '../services/auth.service.js';
import { signinSchema, signupSchema } from '../schemas/users.schema.js';
import config from '../config/config.js';

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
