// middlewares/rateLimiter.ts
import rateLimit from 'express-rate-limit';

export const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP/email to 3 OTP requests per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: options.message,
    });
  },
  message: 'Too many OTP requests. Please try again after 15 minutes.',
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts per 15 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: options.message,
    });
  },
  message: 'Too many login attempts. Please try again after 15 minutes.',
});

export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Only 3 signups allowed per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: options.message,
    });
  },
  message: 'Too many accounts created from this IP, please try again later.',
});
