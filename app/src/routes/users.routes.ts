import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/roles.middleware.js';
import { getProfile, getAdminDashboard } from '../controllers/user.controller.js';

const router = Router();

router.get('/me', authenticateUser, getProfile);
router.get('/admin/dashboard', authenticateUser, authorizeRoles('admin'), getAdminDashboard);

export default router;
