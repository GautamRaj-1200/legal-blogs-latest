import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import * as postService from '../services/posts.service.js';
import { FilterQuery, SortOrder } from 'mongoose';
import { IPost } from '../types/posts.types.js';

interface FindPostsOptions {
  sort?: Record<string, SortOrder>;
  page?: number;
  limit?: number;
  search?: string;
}

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.createPost(req.body);
  ApiResponse.success(post, 'Post created successfully', 201).send(res);
});

export const findPosts = asyncHandler(async (req: Request, res: Response) => {
  // Extract and build filters from query parameters
  const filters: FilterQuery<IPost> = {};
  if (req.query.author) filters.author = req.query.author;
  if (req.query.category) filters.categories = req.query.category;
  // Add more filter conditions as needed

  // Extract and build options
  const options: FindPostsOptions = {
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    search: req.query.search as string | undefined,
    // Handle sort if needed
  };

  const posts = await postService.findPosts(filters, options);
  ApiResponse.success(posts, 'Posts fetched successfully', 200).send(res);
});

export const findPostById = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.findPostById(req.params.id);
  ApiResponse.success(post, 'Post fetched successfully', 200).send(res);
});

export const updatePostById = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.updatePostById(req.params.id, req.body);
  ApiResponse.success(post, 'Post updated successfully', 200).send(res);
});

export const deletePostById = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.deletePostById(req.params.id);
  ApiResponse.success(post, 'Post deleted successfully', 200).send(res);
});
