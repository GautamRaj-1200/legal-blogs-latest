import { Types } from 'mongoose';

export interface IPost {
  title: string;
  desc: string;
  coverImage: string;
  postImages?: string[];
  author: Types.ObjectId;
  categories: Types.ObjectId[];
}
