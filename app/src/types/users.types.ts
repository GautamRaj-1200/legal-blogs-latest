export interface IUser {
  firstName: string;
  email: string;
  password: string;
  refreshToken?: string;
  otp?: number;
  otpExpiry?: Date;
  isVerified: boolean;
  isActive: boolean;
  role: 'viewer' | 'author' | 'admin';
}
