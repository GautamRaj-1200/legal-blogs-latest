import { Post } from '../models/posts.model.js';
import { IPost } from '../types/posts.types.js';
import { FilterQuery, SortOrder } from 'mongoose';

export const createPost = async (data: IPost) => {
  return await Post.create(data);
};

export const findPosts = async (
  filters: FilterQuery<IPost> = {},
  options: {
    sort?: Record<string, SortOrder>;
    page?: number;
    limit?: number;
    search?: string;
  } = {}
) => {
  const { sort = { createdAt: -1 }, page = 1, limit = 10, search } = options;

  const skip = (page - 1) * limit;

  if (search) {
    filters.$text = { $search: search };
  }

  const posts = await Post.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate(['author', 'categories']);
  const total = await Post.countDocuments(filters);

  return {
    data: posts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const findPostById = async (id: string) => {
  const post = await Post.findById(id).populate(['author', 'categories']);
  return post;
};

export const updatePostById = async (id: string, updates: Partial<IPost>) => {
  const post = await Post.findByIdAndUpdate(id, updates, { new: true }).populate([
    'author',
    'categories',
  ]);
  return post;
};

export const deletePostById = async (id: string) => {
  const post = await Post.findByIdAndDelete(id);
  return post;
};
