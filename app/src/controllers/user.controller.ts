import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Response } from 'express';

export const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  ApiResponse.success(user, 'User profile fetched successfully').send(res);
});

export const getAdminDashboard = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  ApiResponse.success(
    { message: `Welcome to Admin Dashboard, ${req.user?.email}` },
    'Admin dashboard data'
  ).send(res);
});
