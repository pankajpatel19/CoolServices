import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendBookEmail = async (booking) => {
  if (!booking || (!booking.email && !process.env.ADMIN_EMAIL)) {
    console.error("[EmailService] sendBookEmail aborted: Invalid booking or recipient");
    return;
  }

  try {
    await sgMail.send({
      from: `"Cool Service Store" <${process.env.EMAIL_USER}>`,
      to: booking.email || process.env.ADMIN_EMAIL,
      subject: `Booking Confirmed! ✅ - Service Store`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px 20px; text-align: center; }
          .content { padding: 30px; }
          .booking-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 20px 0; }
          .footer { background: #f1f5f9; color: #64748b; padding: 20px; text-align: center; font-size: 12px; }
          .button { display: inline-block; padding: 12px 25px; background-color: #2563eb; color: white !important; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
          .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #dcfce7; color: #166534; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed!</h1>
            <p>We've received your service request</p>
          </div>
          <div class="content">
            <p>Hello <strong>${booking.name || "Customer"}</strong>,</p>
            <p>Thank you for choosing Cool Service Store. Your booking has been successfully confirmed. Our team will contact you shortly to coordinate the service.</p>
            
            <div class="booking-card">
              <h3 style="margin-top: 0; color: #1e3a8a;">Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b;">Service ID:</td><td style="padding: 8px 0; font-weight: bold; text-align: right;">#${booking.id || "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Product:</td><td style="padding: 8px 0; font-weight: bold; text-align: right;">${booking.productType || "General Service"}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Schedule:</td><td style="padding: 8px 0; font-weight: bold; text-align: right;">${booking.date || "As per convenience"}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Status:</td><td style="padding: 8px 0; text-align: right;"><span class="status-badge">Confirmed</span></td></tr>
              </table>
            </div>

            <p><strong>Address:</strong><br>${booking.address || "As provided in profile"}</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || "#"}/my-bookings" class="button">Track Your Request</a>
            </center>

            <p style="margin-top: 30px; font-size: 14px; color: #64748b;">Need help? Reply to this email or call us at ${process.env.SUPPORT_PHONE || "+91 1234567890"}</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Cool Service Store. All rights reserved.</p>
            <p>Quality Service | Trusted Technicians | Quick Turnaround</p>
          </div>
        </div>
      </body>
      </html>
    `,
    });
    console.log(`[EmailService] Booking confirmation sent to ${booking.email || "Admin"}`);
  } catch (error) {
    console.error("[EmailService] sendBookEmail failed:", error.response?.body || error.message);
  }
};

export const SignUpEmail = async (register) => {
  if (!register || !register.email) {
    console.error("[EmailService] SignUpEmail aborted: Invalid register data");
    return;
  }

  try {
    await sgMail.send({
      from: `"Cool Service Store" <${process.env.EMAIL_USER}>`,
      to: register.email || process.env.ADMIN_EMAIL,
      subject: "Welcome to Cool Service Store! 🎉",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background-color: #1a73e8; padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; }
          .content { padding: 40px 30px; }
          .content h2 { color: #202124; font-size: 20px; margin-bottom: 20px; }
          .features { background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 25px 0; }
          .feature-item { display: flex; align-items: flex-start; margin-bottom: 15px; }
          .feature-icon { font-size: 20px; margin-right: 15px; }
          .cta-button { display: inline-block; background-color: #1a73e8; color: #ffffff !important; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 500; margin-top: 10px; }
          .footer { padding: 30px; text-align: center; background-color: #f1f3f4; color: #70757a; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Cool Service Store</h1>
          </div>
          <div class="content">
            <h2>Welcome aboard, ${register.userName || "Valued Customer"}!</h2>
            <p>We're thrilled to have you join our community of smart homeowners who prioritize quality maintenance and reliable repairs.</p>
            
            <div class="features">
              <h3 style="margin-top: 0; font-size: 16px;">What you can do now:</h3>
              <div class="feature-item">
                <span class="feature-icon">🛠️</span>
                <div><strong>Book Services</strong>: Schedule AC repair, plumbing, or electrical works in seconds.</div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📍</span>
                <div><strong>Track Progress</strong>: Real-time updates on your service technician's location.</div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🛡️</span>
                <div><strong>Service Warranty</strong>: Access digital invoices and warranty tracking for all repairs.</div>
              </div>
            </div>

            <p>Get started by completing your profile to speed up future bookings.</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || "#"}/login" class="cta-button">Sign In to Your Account</a>
            </center>
          </div>
          <div class="footer">
            <p>You received this email because you signed up for Cool Service Store.</p>
            <p>© ${new Date().getFullYear()} Cool Service Store. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    });
    console.log(`[EmailService] Welcome email sent to ${register.email}`);
  } catch (error) {
    console.error("[EmailService] SignUpEmail failed:", error.response?.body || error.message);
  }
};

export const alertUser = async (data) => {
  if (!data || !data.email) {
    console.error("[EmailService] alertUser aborted: Invalid data");
    return;
  }

  try {
    await sgMail.send({
      from: `"Home Appliance Service Store" <${process.env.EMAIL_USER}>`,
      to: data.email || process.env.ADMIN_EMAIL,
      subject: `Service Request Confirmed ✅ - #${data.requestId || "PENDING"}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0f2f5; color: #1c1e21; margin: 0; padding: 0; }
          .wrapper { width: 100%; table-layout: fixed; background-color: #f0f2f5; padding-bottom: 40px; }
          .main { background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 8px; border-top: 6px solid #ff9800; border-collapse: separate; }
          .header { padding: 40px 20px; text-align: center; }
          .content { padding: 20px 40px 40px; }
          .details-box { background-color: #fff9c4; border-left: 4px solid #fbc02d; padding: 20px; border-radius: 4px; margin: 25px 0; }
          .footer { text-align: center; font-size: 13px; color: #8d949e; padding-top: 20px; }
        </style>
      </head>
      <body>
        <table class="wrapper">
          <tr>
            <td>
              <table class="main">
                <tr>
                  <td class="header">
                    <h1 style="margin: 0; font-size: 24px;">Booking Details Received!</h1>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <p>Dear Customer,</p>
                    <p>We've successfully received your booking. Our expert technicians are ready to provide you with the best service experience.</p>
                    
                    <div class="details-box">
                      <h3 style="margin-top: 0;">Summary of Service</h3>
                      <p style="margin: 5px 0;"><strong>Request ID:</strong> #${data.requestId || "PENDING"}</p>
                      <p style="margin: 5px 0;"><strong>Service:</strong> ${data.serviceType || "Home Appliance"}</p>
                      <p style="margin: 5px 0;"><strong>Date:</strong> ${data.date || "To be scheduled"}</p>
                    </div>

                    <p><strong>What happens next?</strong></p>
                    <ol>
                      <li>Our team will verify technician availability.</li>
                      <li>You will receive a confirmation call shortly.</li>
                      <li>A technician will visit your location at the scheduled time.</li>
                    </ol>

                    <p>Warm regards,<br><strong>Service Store Team</strong></p>
                  </td>
                </tr>
              </table>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Cool Service Store. All rights reserved.</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    });
    console.log(`[EmailService] Alert sent to ${data.email}`);
  } catch (error) {
    console.error("[EmailService] alertUser failed:", error.response?.body || error.message);
  }
};

export const TechReminder = async (job) => {
  if (!job || !job.technicianEmail) {
    console.error("[EmailService] TechReminder aborted: Invalid job data");
    return;
  }

  try {
    await sgMail.send({
      from: `"Home Appliance Service Store" <${process.env.EMAIL_USER}>`,
      to: job.technicianEmail || process.env.ADMIN_EMAIL,
      subject: `🛠️ New Job Assigned - Service #${job.id}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #fdfdfd; padding: 0; margin: 0; }
          .container { max-width: 600px; margin: 30px auto; background: white; border: 1px solid #eee; border-radius: 12px; overflow: hidden; }
          .banner { background: #4527a0; color: white; padding: 30px; text-align: center; }
          .info-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
          .info-table td { padding: 12px; border-bottom: 1px solid #f5f5f5; }
          .label { color: #666; font-size: 14px; width: 40%; }
          .value { color: #111; font-weight: 500; text-align: right; }
          .steps { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="banner">
            <h2 style="margin: 0;">New Assignment</h2>
            <p style="margin: 5px 0 0; opacity: 0.9;">Service ID #${job.id}</p>
          </div>
          <div style="padding: 30px;">
            <p>Hello Technician,</p>
            <p>A new service request has been assigned to you. Please review the details below and proceed as soon as possible.</p>

            <table class="info-table">
              <tr><td class="label">Customer Name:</td><td class="value">${job.name || "N/A"}</td></tr>
              <tr><td class="label">Phone:</td><td class="value">${job.phone || "N/A"}</td></tr>
              <tr><td class="label">Location:</td><td class="value">${job.address || "Check Dashboard"}</td></tr>
              <tr><td class="label">Preferred Time:</td><td class="value">${job.timeSlot || "Immediately"}</td></tr>
            </table>

            <div class="steps">
              <h4 style="margin-top: 0; color: #4527a0;">Action Steps:</h4>
              <ul style="margin-bottom: 0; padding-left: 20px; font-size: 14px;">
                <li>Call customer to confirm the visit.</li>
                <li>Prepare required tools & components.</li>
                <li>Update job status upon reaching site.</li>
              </ul>
            </div>

            <center>
              <a href="${process.env.DASHBOARD_URL || "#"}/technician/job/${job.id}" style="display: inline-block; background: #673ab7; color: white !important; padding: 14px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">View Job Details</a>
            </center>
          </div>
        </div>
      </body>
      </html>
    `,
    });
    console.log(`[EmailService] Tech reminder sent to ${job.technicianEmail}`);
  } catch (error) {
    console.error("[EmailService] TechReminder failed:", error.response?.body || error.message);
  }
};

export const forget = async (email, user, resetLink) => {
  if (!email || !resetLink) {
    console.error("[EmailService] forget aborted: Missing email or resetLink");
    return;
  }

  try {
    await sgMail.send({
      from: `"Cool Service Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Link - Cool Service Store",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a73e8; text-align: center;">Password Reset Request</h2>
          <p>Hello <strong>${user?.userName || "there"}</strong>,</p>
          <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
          <p>This link will expire in 10 minutes:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #1a73e8; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset My Password</a>
          </div>
          <p style="font-size: 12px; color: #777;">Or copy and paste this link in your browser:</p>
          <p style="font-size: 12px; word-break: break-all; color: #1a73e8;">${resetLink}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 11px; color: #999; text-align: center;">© ${new Date().getFullYear()} Cool Service Store. All rights reserved.</p>
        </div>
      `,
    });
    console.log(`[EmailService] Password reset sent to ${email}`);
  } catch (error) {
    console.error("[EmailService] forget failed:", error.response?.body || error.message);
  }
};
