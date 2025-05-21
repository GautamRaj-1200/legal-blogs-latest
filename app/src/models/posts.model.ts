import mongoose from 'mongoose';
import { IPost } from '../types/posts.types.js';

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    postImages: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', desc: 'text' });

export const Post = mongoose.model<IPost>('Post', postSchema);
