import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().trim().min(2, 'Last name should have at least 2 characters'),
  email: z.string().trim().email('Invalid email address'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters'),
});

export const signinSchema = z.object({
  email: z.string().trim().email('Invalid Email Address'),
  password: z.string().trim().nonempty('Password is required'),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
