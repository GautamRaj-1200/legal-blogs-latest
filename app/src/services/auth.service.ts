import * as userRepo from '../repositories/users.repository.js';
import { SignupInput } from '../schemas/users.schema.js';
import { ApiError } from '../utils/apiError.js';

export const createUser = async (data: SignupInput) => {
  const { email } = data;
  const existingUser = await userRepo.findByEmail(email);

  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email');
  }

  const newUser = await userRepo.create(data);
  const createdUser = await userRepo.findById(
    newUser._id,
    '-password -refreshToken -isVerified -isActive -role -createdAt -updatedAt'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }
  return createdUser;
};
