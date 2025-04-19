import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  desc: z.string().min(1, 'Description is required'),
  coverImage: z.string().url('Cover image must be a valid URL'),
  postImages: z.array(z.string().url()).optional(),
  author: z.string().min(1, 'Author ID is required'),
  categories: z.string().min(1, 'Category ID is required'),
});

export const postUpdateSchema = postSchema.partial();

export const postQuerySchema = z.object({
  sort: z.record(z.union([z.literal(1), z.literal(-1)])).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
  search: z.string().optional(),
});
