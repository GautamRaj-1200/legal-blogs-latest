import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Extended request interface
export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    email: string;
    role: string;
  };
}

export const authenticateUser = asyncHandler(
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check cookies
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // Check Authorization header
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Access token missing');
    }

    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET as string) as {
      _id: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  }
);
