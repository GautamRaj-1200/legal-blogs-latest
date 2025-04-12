import { User } from '../models/users.model.js';
import { SignupInput } from '../schemas/users.schema.js';
import { IUser } from '../types/users.types.js';

/**********BASIC**********/
export const create = async (data: SignupInput): Promise<IUser> => {
  const user = new User(data);
  return await user.save();
};

export const findById = async (id: string, projection: string = ''): Promise<IUser | null> => {
  return await User.findById(id).select(projection);
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const updateById = async (id: string, updates: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteById = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

/**********AUTH**********/

export const updateRefreshToken = async (id: string, token: string) => {
  return await User.findByIdAndUpdate(id, { refreshToken: token }, { new: true });
};

export const clearRefreshToken = async (id: string) => {
  return await User.findByIdAndUpdate(id, { refreshToken: '' });
};

/**********ACCOUNT MANAGEMENT**********/

export const verifyUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
};

export const activateUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isActive: true }, { new: true });
};

export const deactivateuser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

/**********OTP Logic**********/

export const updateOtp = async (id: string, otp: number, expiry: Date) => {
  return await User.findByIdAndUpdate(id, { otp: otp, otpExpiry: expiry });
};

export const deleteOtp = async (id: string) => {
  return await User.findByIdAndUpdate(id, { otp: null, otpExpiry: null });
};

/**********Search and Filters**********/
export const findAll = async (filters: object = {}) => {
  return await User.find(filters);
};
/*
🔐 Auth-Specific Utilities
findByRefreshToken(token: string) – Useful for token rotation or validation.

findUnverifiedUsers() – If using OTP/email verification flows..
*/
