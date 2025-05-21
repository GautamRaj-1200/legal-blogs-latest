import { FilterQuery, SortOrder } from 'mongoose';
import * as postRepo from '../repositories/posts.repository.js';
import { IPost } from '../types/posts.types';
import { ApiError } from '../utils/apiError.js';

interface FindPostsOptions {
  sort?: Record<string, SortOrder>;
  page?: number;
  limit?: number;
  search?: string;
}
export const createPost = async (data: IPost) => {
  return await postRepo.createPost(data);
};

export const findPosts = async (filters: FilterQuery<IPost>, options: FindPostsOptions) => {
  return await postRepo.findPosts(filters, options);
};

export const findPostById = async (id: string) => {
  const post = await postRepo.findPostById(id);
  if (!post) throw new ApiError(404, 'Post not found');
  return post;
};

export const updatePostById = async (id: string, updates: Partial<IPost>) => {
  const post = await postRepo.updatePostById(id, updates);
  if (!post) throw new ApiError(404, 'Post not found');
  return post;
};

export const deletePostById = async (id: string) => {
  const post = await postRepo.deletePostById(id);
  if (!post) throw new ApiError(404, 'Post not found');
  return post;
};
