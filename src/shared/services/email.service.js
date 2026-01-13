import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

/* ======================
   SMTP TRANSPORT (PRODUCTION SAFE)
   ====================== */

const transporter = nodemailer.createTransport({
  host: env.emailHost,                 // smtp.gmail.com
  port: Number(env.emailPort),         // 587
  secure: false,                       // STARTTLS
  requireTLS: true,                    // 🔑 IMPORTANT for Gmail
  auth: {
    user: env.emailUser,               // your Gmail
    pass: env.emailPass,               // Gmail App Password
  },

  // 🔐 Prevent connection timeouts on cloud platforms
  connectionTimeout: 20_000,
  greetingTimeout: 20_000,
  socketTimeout: 20_000,
});

/* ======================
   VERIFY SMTP (FAIL FAST)
   ====================== */

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email service error:", error.message);
  } else {
    console.log("📧 Email service ready");
  }
});

/* ======================
   SEND EMAIL
   ====================== */

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: env.emailFrom,
      to,
      subject,
      html,
    });

    console.log(`📨 Email sent to ${to}`);
  } catch (err) {
    // ❗ Do NOT crash the app
    console.error("❌ Failed to send email:", err.message);
  }
};
