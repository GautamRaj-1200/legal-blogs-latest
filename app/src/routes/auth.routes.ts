import { Router } from 'express';
import {
  newAccessToken,
  registerUser,
  resendOtp,
  logoutUser,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';
import { authenticateRefreshToken } from '../middlewares/auth.middleware.js';
import { otpRequestLimiter, loginLimiter, signupLimiter } from '../utils/rateLimitter.js';

const router = Router();

router.post('/users', signupLimiter, registerUser);
router.post('/sessions', loginLimiter, loginUser);
router.delete('/sessions', authenticateRefreshToken, logoutUser);
router.post('/tokens', authenticateRefreshToken, newAccessToken);
router.post('/otp/validations', verifyOtp);
router.post('/otp/deliveries', otpRequestLimiter, resendOtp);
router.post('/passwords/forgot', otpRequestLimiter, forgotPassword);
router.post('/passwords/reset', resetPassword);

export default router;
