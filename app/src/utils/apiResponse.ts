import { Response } from 'express';

// Define generic type for data
export class ApiResponse<T = unknown> {
  constructor(
    public readonly statusCode: number,
    public readonly data: T | null = null,
    public readonly message: string = 'Success',
    public readonly success: boolean = statusCode < 400,
    public readonly errors: string[] = []
  ) {}

  // Factory methods for common responses
  static success<T>(
    data: T = null as unknown as T,
    message: string = 'Success',
    statusCode: number = 200
  ) {
    return new ApiResponse<T>(statusCode, data, message);
  }

  static error(
    message: string = 'Error occurred',
    statusCode: number = 500,
    errors: string[] = []
  ) {
    return new ApiResponse(statusCode, null, message, false, errors);
  }

  static notFound(message: string = 'Resource not found') {
    return new ApiResponse(404, null, message, false);
  }

  static badRequest(message: string = 'Bad request', errors: string[] = []) {
    return new ApiResponse(400, null, message, false, errors);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new ApiResponse(401, null, message, false);
  }

  static forbidden(message: string = 'Forbidden') {
    return new ApiResponse(403, null, message, false);
  }

  // Send the response
  send(res: Response): Response {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
      ...(this.errors.length ? { errors: this.errors } : {}),
    });
  }
}
