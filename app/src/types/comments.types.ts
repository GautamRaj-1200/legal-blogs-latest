import { Types } from 'mongoose';

export interface IComment {
  text: string;
  user: Types.ObjectId;
  guestName: string;
  guestEmail: string;
  isVerified: boolean;
  otp: string;
  otpExpiresAt: Date;
  post: Types.ObjectId;
}
