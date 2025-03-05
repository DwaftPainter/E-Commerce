export const otpEmailTemplate = (otp: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset OTP</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          text-align: center;
          padding: 40px;
        }
        .email-container {
          background-color: #ffffff;
          padding: 20px;
          max-width: 500px;
          margin: 0 auto;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .otp {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
          margin: 20px 0;
        }
        .footer {
          font-size: 12px;
          color: #7f8c8d;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password. Use the OTP below to proceed.</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for 5 minutes. If you didn't request this, please ignore this email.</p>
        <p class="footer">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </body>
    </html>
    `;
  };
  