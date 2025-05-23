import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import * as postService from '../services/posts.service.js';
import { FilterQuery, SortOrder, Types } from 'mongoose';
import { IPost } from '../types/posts.types.js';
import { s3, S3_BUCKET_NAME } from '../utils/aws.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { Category } from '../models/categories.model.js';

interface FindPostsOptions {
  sort?: Record<string, SortOrder>;
  page?: number;
  limit?: number;
  search?: string;
}

export const createPost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { title, desc, categories } = req.body;

  console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    ApiResponse.error('Cover image is required', 400).send(res);
    return;
  }

  const coverImageFileName = Date.now() + '-' + req.file?.originalname;
  const coverImageFile = req.file?.buffer;
  const user = req.user;

  console.log(categories);
  const uploadParams = {
    Bucket: S3_BUCKET_NAME,
    Key: coverImageFileName,
    Body: coverImageFile,
    ContentType: req.file?.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  const categoryDocs = await Category.find({ categoryName: { $in: categories } });

  if (categoryDocs.length !== categories.length) {
    ApiResponse.error('One or more categories not found', 400).send(res);
    return;
  }

  const postData: Partial<IPost> = {
    title,
    desc,
    categories: categoryDocs.map((doc) => doc._id),
    coverImage: coverImageFileName,
    author: user?._id ? new Types.ObjectId(user._id) : undefined,
  };

  const createdPost = await postService.createPost(postData as IPost);
  ApiResponse.success(createdPost, 'Post created successfully', 201).send(res);
  return;
});

export const findPosts = asyncHandler(async (req: Request, res: Response) => {
  // Extract and build filters from query parameterslegal-blogs
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
