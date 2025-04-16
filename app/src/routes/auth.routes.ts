import { Router } from 'express';
import { newAccessToken, registerUser } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';
import { authenticateRefreshToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/access-token', authenticateRefreshToken, newAccessToken);

export default router;
