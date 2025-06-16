import { Router } from 'express';
import { getSignedUrl } from '../controllers/uploads.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateUser, getSignedUrl);

export default router;
