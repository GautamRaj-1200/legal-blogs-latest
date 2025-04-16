## `ApiResponse.ts`

```js
class ApiResponse {
  constructor(statusCode, data = null, message = "Success", success = statusCode < 400, errors = []) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = errors;
  }

  // Factory methods for common responses
  static success(data = null, message = "Success", statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }

  static error(message = "Error occurred", statusCode = 500, errors = []) {
    return new ApiResponse(statusCode, null, message, false, errors);
  }

  static notFound(message = "Resource not found") {
    return new ApiResponse(404, null, message, false);
  }

  static badRequest(message = "Bad request", errors = []) {
    return new ApiResponse(400, null, message, false, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiResponse(401, null, message, false);
  }

  static forbidden(message = "Forbidden") {
    return new ApiResponse(403, null, message, false);
  }

static tooManyRequests(message = "Too many requests", errors = ["Please try again later"]) {
    return new ApiResponse(429, null, message, false, errors);
  }

  static unprocessableEntity(errors = ["Invalid input data"], message = "Validation failed") {
    return new ApiResponse(422, null, message, false, errors);
  }
  // Send the response
  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
      ...(this.errors.length ? { errors: this.errors } : {}),
    });
  }
}

export ApiResponse
```

### Using this

```js
const express = require("express");
const ApiResponse = require("./ApiResponse");

const app = express();

// ✅ Using Factory Methods for Common Responses
app.get("/success", (req, res) => {
  ApiResponse.success({ user: "John Doe" }, "Data fetched successfully").send(
    res
  );
});

app.get("/unauthorized", (req, res) => {
  ApiResponse.unauthorized().send(res);
});

app.get("/not-found", (req, res) => {
  ApiResponse.notFound().send(res);
});

// 🚀 Handling a New Type of Response (Custom Response)
app.get("/rate-limit", (req, res) => {
  const response = new ApiResponse(429, null, "Too many requests", false, [
    "Please wait before retrying.",
  ]);
  response.send(res);
});

// Example of Custom Validation Error Handling
app.post("/validate", (req, res) => {
  const errors = [
    "Email is required",
    "Password must be at least 6 characters",
  ];
  const response = new ApiResponse(
    422,
    null,
    "Validation failed",
    false,
    errors
  );
  response.send(res);
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
```

## `ApiError.ts`

```js
const ApiResponse = require("./apiResponse");

class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    errors = [],
    stack
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Convert to ApiResponse with consistent success determination
  toResponse(includeStack = false) {
    return new ApiResponse(
      this.statusCode,
      null,
      this.message,
      false, // Explicitly set success to false for errors
      [...this.errors, ...(includeStack && this.stack ? [this.stack] : [])]
    );
  }
}

export default ApiError;
```

## `asynHandler.ts`

```js
import { Request, Response, NextFunction } from "express";

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      // Optional: Add logging or additional error context
      console.error("Async handler error:", err);
      next(err);
    });
  };
};
```
