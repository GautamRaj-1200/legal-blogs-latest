import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import process from 'process';

export const errorHandler = (
  err: Error | ApiError | unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  console.error(err);

  if (err instanceof ApiError) {
    err.toResponse(process.env.NODE_ENV !== 'production').send(res);
    return;
  }

  const message = err instanceof Error ? err.message : 'An unexpected error occurred';
  ApiResponse.error(message).send(res);
};
