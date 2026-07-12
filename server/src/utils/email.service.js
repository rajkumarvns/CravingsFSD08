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
      "../../../client/src/assets/circleLogo.png",
    );

    const mailOptions = {
      from: process.env.GMAIL_USERNAME
        ? `"Cravings Food Delivery" <${process.env.GMAIL_USERNAME}>`
        : '"Cravings Food Delivery" <noreply@cravings.com>',
      to: email,
      subject: "🍔 Cravings - Your OTP Verification Code",
      html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f7f6; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%); padding: 40px 20px; text-align: center;">
        <img src="cid:cravingslogo" alt="Cravings Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;" />
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">OTP Verification</h1>
      </div>

      <!-- Body -->
      <div style="padding: 40px 30px; color: #4a4a4a;">
        <h2 style="margin-top: 0; color: #2d3748; font-size: 22px;">Hello ${fullName}, 👋</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #718096; margin-bottom: 30px;">
          Thank you for choosing <strong>Cravings Food Delivery</strong>. To complete your secure login or registration, please use the One-Time Password (OTP) below:
        </p>

        <!-- OTP Box -->
        <div style="background: #f8fafc; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px;">
          <span style="font-size: 42px; font-weight: 800; color: #ff6b35; letter-spacing: 8px;">${newOTP}</span>
        </div>
        
        <p style="font-size: 14px; line-height: 1.6; color: #a0aec0; text-align: center; margin-bottom: 30px;">
          This code will expire in <strong>10 minutes</strong>. If you did not request this OTP, please ignore this email or contact support.
        </p>

        <div style="text-align: center;">
          <a href="http://172.168.6.80:5173" style="display: inline-block; background: #ff6b35; color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 50px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3); transition: all 0.3s ease;">
            Visit Cravings
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #2d3748; padding: 25px; text-align: center; border-top: 1px solid #1a202c;">
        <p style="margin: 0; color: #a0aec0; font-size: 13px; line-height: 1.5;">
          © ${new Date().getFullYear()} Cravings Food Delivery.<br>
          Serving happiness, one meal at a time. 🍽️
        </p>
      </div>

    </div>
  </div>
      `,
      attachments: [
        {
          filename: "logo.png",
          path: logoPath,
          cid: "cravingslogo",
        },
      ],
    };

    if (process.env.GMAIL_USERNAME && process.env.GMAIL_PASSCODE) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn(
        "Gmail credentials not found in env, skipping actual email send.",
      );
    }
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};
