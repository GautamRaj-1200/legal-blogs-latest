import { Category } from '../models/categories.model.js';
import { ICategory } from '../types/categories.types.js';
import mongoose from 'mongoose';

export const findAllCategories = async (): Promise<ICategory[]> => {
  return Category.find().lean().exec();
};

export const findCategoryById = async (
  id: string | mongoose.Types.ObjectId
): Promise<ICategory | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null; // Or throw an error, depending on desired handling for invalid ID format
  }
  return Category.findById(id).lean().exec();
};
