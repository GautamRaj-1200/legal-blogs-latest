import { ApiResponse } from "./apiResponse.js";

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number = 500,
    message: string = "Something went wrong",
    public readonly errors: string[] = [],
    stack?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Convert to ApiResponse with consistent success determination
  toResponse(includeStack: boolean = false): ApiResponse {
    // Always pass false for success parameter to be consistent with ApiResponse
    return new ApiResponse(
      this.statusCode,
      null,
      this.message,
      false, // Explicitly set success to false for errors
      [...this.errors, ...(includeStack && this.stack ? [this.stack] : [])]
    );
  }
}
