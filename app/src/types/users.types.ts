export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken?: string;
  otp?: number;
  otpExpiry?: Date;
  isVerified: boolean;
  isActive: boolean;
  role: 'viewer' | 'author' | 'admin';
  generateAccessToken(): string;
  generateRefreshToken(): string;
  isPasswordValid(password: string): Promise<boolean>;
  isUserVerified(): boolean;
  isUserActive(): boolean;
}
