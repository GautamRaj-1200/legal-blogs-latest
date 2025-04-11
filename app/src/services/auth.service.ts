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

  return newUser;
};
