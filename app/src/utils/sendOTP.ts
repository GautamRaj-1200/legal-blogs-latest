import { ApiResponse } from './apiResponse';
import { ApiError } from './apiError';
import nodemailer from 'nodemailer';
import config from '../config/config';
import { Response } from 'express';

interface emailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.NODEMAILER_EMAIL,
    pass: config.NODEMAILER_PASS,
  },
});

export const sendingEmail = async ({ to, subject, html }: emailOptions, res: Response) => {
  const mailOptions = {
    from: config.NODEMAILER_EMAIL,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return ApiResponse.success(info, 'Email sent successfully').send(res);
  } catch (error) {
    console.error(error);
    const apiError = new ApiError(500, 'Failed to send email', ['Email sending error']);
    return apiError.toResponse().send(res);
  }
};
