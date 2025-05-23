import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as categoryService from '../services/categories.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import mongoose from 'mongoose';

export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  ApiResponse.success(categories, 'Categories fetched successfully', 200).send(res);
});

export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = req.params.id as string | mongoose.Types.ObjectId;
  const category = await categoryService.getCategoryById(categoryId);
  ApiResponse.success(category, 'Category fetched successfully', 200).send(res);
});
