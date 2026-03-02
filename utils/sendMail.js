import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async ({ name, email, phone, message, reason }) => {
  const mailOptions = {
    from: `"Scratchnest Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🚀 New Website Inquiry from ${name}`,
    html: `
      <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, Helvetica, sans-serif;">
        
        <!-- Main Wrapper -->
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:30px;text-align:center;">
              <h1 style="color:#22c55e;margin:0;font-size:24px;letter-spacing:1px;">
                SCRATCHNEST
              </h1>
              <p style="color:#cbd5e1;margin-top:8px;font-size:14px;">
                New Contact Form Submission
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              
              <h2 style="margin-top:0;color:#111827;font-size:20px;">
                📩 New Lead Details
              </h2>

              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                
                <tr style="background:#f9fafb;">
                  <td style="font-weight:bold;color:#374151;">Name</td>
                  <td style="color:#111827;">${name}</td>
                </tr>

                <tr>
                  <td style="font-weight:bold;color:#374151;">Email</td>
                  <td style="color:#111827;">${email}</td>
                </tr>

                <tr style="background:#f9fafb;">
                  <td style="font-weight:bold;color:#374151;">Phone</td>
                  <td style="color:#111827;">${phone || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="font-weight:bold;color:#374151;">Reason</td>
                  <td style="color:#111827;">${reason || "General Inquiry"}</td>
                </tr>

              </table>

              <!-- Message Section -->
              <div style="margin-top:25px;padding:20px;background:#f3f4f6;border-radius:8px;">
                <p style="margin:0;font-weight:bold;color:#111827;">Message:</p>
                <p style="margin-top:10px;color:#374151;line-height:1.6;">
                  ${message}
                </p>
              </div>

              <!-- CTA -->
              <div style="margin-top:30px;text-align:center;">
                <a href="mailto:${email}" 
                   style="display:inline-block;padding:12px 24px;background:#22c55e;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;">
                  Reply to ${name}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;padding:20px;text-align:center;">
              <p style="color:#94a3b8;font-size:12px;margin:0;">
                © ${new Date().getFullYear()} Scratchnest. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export default sendMail;