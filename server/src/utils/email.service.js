import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendOTPEmail = async (email, newOTP, fullName = "User") => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    const logoPath = path.resolve(
      __dirname,
      "../../client/src/assets/circleLogo.png",
    );

    const mailOptions = {
      from: process.env.GMAIL_USERNAME
        ? `"Cravings Food Delivery" <${process.env.GMAIL_USERNAME}>`
        : '"Cravings Food Delivery" <noreply@cravings.com>',
      to: email,
      subject: "Cravings - Your OTP Verification Code",
      text: `Hello ${fullName},\n\nThank you for choosing Cravings Food Delivery.\n\nTo complete your secure login or registration, please use the One-Time Password (OTP) below:\n\n${newOTP}\n\nThis code will expire in 10 minutes. If you did not request this OTP, please ignore this email or contact support.\n\nThanks,\nCravings Team`,
    };

    if (!process.env.GMAIL_USERNAME || !process.env.GMAIL_PASSCODE) {
      throw new Error("Gmail credentials not found in env, skipping actual email send.");
    }
    
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};
