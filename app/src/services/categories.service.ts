import * as categoryRepository from '../repositories/categories.repository.js';
import { ICategory } from '../types/categories.types.js';
import { ApiError } from '../utils/apiError.js';
import mongoose from 'mongoose';

export const getAllCategories = async (): Promise<ICategory[]> => {
  return categoryRepository.findAllCategories();
};

export const getCategoryById = async (id: string | mongoose.Types.ObjectId): Promise<ICategory> => {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};
