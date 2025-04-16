import { Router } from 'express';
import {
  newAccessToken,
  registerUser,
  resendOtp,
  logoutUser,
  verifyOtp,
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

export default router;
