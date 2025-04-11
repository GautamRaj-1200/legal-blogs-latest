import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import * as userService from '../services/auth.service.js';
import { signupSchema } from '../schemas/users.schema.js';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = signupSchema.parse(req.body);
  const user = await userService.createUser(validatedData);
  ApiResponse.success(user, 'User registered successfully', 201).send(res);
});
