export const generateVerifyEmailTemplate = (firstName: string, otp: number) => {
  const year = new Date().getFullYear();
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 40px 30px;
          }
          h3 {
            color: #333333;
          }
          p {
            color: #555555;
            line-height: 1.6;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            color: #0056b3;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h3>Welcome, ${firstName}!</h3>
          <p>
            Your account has been created successfully. To complete your registration,
            please verify your email address by entering the OTP below on the following link: <a href="http://localhost:5173/verify-email">http://localhost:5173/verify-email</a>
          </p>
          <div class="otp">${otp}</div>
          <p>
            This OTP is valid for <strong>15 minutes</strong>. If you did not initiate this request, please ignore this email.
          </p>
          <div class="footer">
            &copy; ${year} YourCompany. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `;
};
