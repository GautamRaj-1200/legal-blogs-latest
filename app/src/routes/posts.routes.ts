import { Router } from 'express';
import { createPost } from '../controllers/posts.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/roles.middleware.js';
const router = Router();
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/post',
  authenticateUser,
  authorizeRoles('author'),
  upload.single('coverImage'),
  createPost
);

export default router;
