import { Router } from 'express';
import { getAllCategories, getCategoryById } from '../controllers/categories.controller.js';

const router = Router();

router.get('/all-categories', getAllCategories);
router.get('/category/:id', getCategoryById);

export default router;
