import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendEmail = async (to, subject, message) => {
  try {
    console.log("Started Sending Email");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSCODE,
      },
    });
    console.log("Transporter created successfully");
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: to,
      subject: subject,
      html: message,
    };
    console.log("Email sent successfully");
    const res = await transporter.sendMail(mailOption);
    console.log(res);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error(error);
  }
};
export default sendEmail;

sendEmail(
  "errg221057@gmail.com",
  "Test Email",
  "<h1>This is a test email</h1>",
);
