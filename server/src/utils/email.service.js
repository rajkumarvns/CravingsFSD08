import nodemailer from "nodemailer";

const sendOTPEmail = (email, newOTP) => {
  try {
    const subject = "OTP Verification";
    const mailOptions = {
      from: '"Cravings Food Delivery" <your-email@gmail.com>',
      to: user.email,
      subject: "🍔 Welcome to Cravings - Registration Successful!",
      html: `
  <div style="font-family:Arial,sans-serif;background:#f8f9fa;padding:30px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">

      <div style="background:#ff6b35;padding:20px;text-align:center;color:white;">
        <h1>🍔 Cravings</h1>
        <p>Your Favorite Food Delivery Partner</p>
      </div>

      <div style="padding:30px;color:#333;">
        <h2>Hello ${user.fullName}, 👋</h2>

        <p>
          Welcome to <strong>Cravings Food Delivery</strong>!
          Your account has been created successfully.
        </p>

        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding:10px;border:1px solid #ddd;">${user.fullName}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding:10px;border:1px solid #ddd;">${user.email}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><strong>Account Status</strong></td>
            <td style="padding:10px;border:1px solid #ddd;color:green;">
              Active ✅
            </td>
          </tr>
        </table>

        <p>
          You can now:
        </p>

        <ul>
          <li>🍕 Order delicious food online</li>
          <li>🏪 Explore nearby restaurants</li>
          <li>🚴 Track your orders in real time</li>
          <li>❤️ Save your favorite meals</li>
        </ul>

        <div style="text-align:center;margin:30px 0;">
          <a href="http://localhost:5173"
             style="background:#ff6b35;color:white;padding:14px 30px;
                    text-decoration:none;border-radius:6px;font-size:16px;">
            Explore Cravings
          </a>
        </div>

        <p>
          Thank you for choosing <strong>Cravings Food Delivery</strong>.
          We look forward to serving your favorite meals.
        </p>

        <p>
          Happy Ordering! 🍽️
        </p>
      </div>

      <div style="background:#222;color:white;text-align:center;padding:15px;font-size:14px;">
        © 2026 Cravings Food Delivery <br>
        Made with ❤️ using MERN Stack
      </div>

    </div>
  </div>
  `,
    };
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};
