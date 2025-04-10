import mongoose from 'mongoose';
import { ICategory } from '../types/categories.types';

const categorySchema = new mongoose.Schema<ICategory>({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    enum: ['law', 'cricket', 'administration'],
  },
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);
