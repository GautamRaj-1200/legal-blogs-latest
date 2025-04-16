import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.NODEMAILER_EMAIL,
    pass: config.NODEMAILER_PASS,
  },
});

export const sendingEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: config.NODEMAILER_EMAIL,
    to,
    subject,
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};
