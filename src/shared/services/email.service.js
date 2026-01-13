import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

/* ======================
   SMTP TRANSPORT
   ====================== */

const transporter = nodemailer.createTransport({
  host: env.emailHost,          // smtp.gmail.com
  port: Number(env.emailPort),  // 587
  secure: false,                // TLS (true only for 465)
  auth: {
    user: env.emailUser,
    pass: env.emailPass,        // Gmail App Password
  },
});

/* ======================
   VERIFY SMTP (FAIL FAST)
   ====================== */

transporter.verify((error, success) => {
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
    console.error("❌ Failed to send email:", err.message);
    // DO NOT crash app — just log
  }
};
