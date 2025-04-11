import mongoose from 'mongoose';
import { IUser } from '../types/users.types.js';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    otp: {
      type: Number,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['viewer', 'author', 'admin'],
      default: 'viewer',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model<IUser>('User', userSchema);
