import { Router } from 'express';
import { createPost, findPostById, findPosts } from '../controllers/posts.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/roles.middleware.js';
const router = Router();
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/post',
  upload.single('coverImage'),
  authenticateUser,
  authorizeRoles('author'),
  createPost
);

router.get('/post/:id', findPostById);
router.get('/', findPosts);

export default router;
