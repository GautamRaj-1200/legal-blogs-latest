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

const router = Router();

router.post('/users', registerUser);
router.post('/sessions', loginUser);
router.delete('/sessions', authenticateRefreshToken, logoutUser);
router.post('/tokens', authenticateRefreshToken, newAccessToken);
router.post('/otp/validations', verifyOtp);
router.post('/otp/deliveries', resendOtp);
router.post('/passwords/forgot', forgotPassword);
router.post('/passwords/reset', resetPassword);

export default router;
