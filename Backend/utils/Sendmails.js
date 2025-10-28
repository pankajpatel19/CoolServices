import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendBookEmail = async (booking) => {
  await sgMail.send({
    from: `"Service Booking" <${process.env.EMAIL_USER}>`,
    to: booking.email || process.env.ADMIN_EMAIL,
    subject: `Booking Confirmed - ${booking.appliance} Service`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px 0;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                      ✓ Booking Confirmed
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.5;">
                      Hello <strong>${booking.name}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 30px; font-size: 16px; color: #666666; line-height: 1.6;">
                      Thank you for choosing our service! Your booking has been confirmed and scheduled successfully.
                    </p>
                    
                    <!-- Booking Details Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 6px; overflow: hidden; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 20px;">
                          <h2 style="margin: 0 0 20px; font-size: 18px; color: #333333; font-weight: 600;">
                            Booking Details
                          </h2>
                          
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 10px 0; font-size: 14px; color: #666666; width: 35%;">
                                <strong style="color: #333333;">Appliance:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${booking.appliance}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Issue:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${booking.issue}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Date:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${booking.date}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Time:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${booking.time}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Contact:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${booking.phone}
                              </td>
                            </tr>
                            ${
                              booking.address
                                ? `
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Address:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${booking.address}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- What's Next -->
                    <div style="background-color: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px 20px; margin-bottom: 30px; border-radius: 4px;">
                      <h3 style="margin: 0 0 10px; font-size: 16px; color: #1976D2;">
                        What's Next?
                      </h3>
                      <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                        Our technician will contact you at <strong>${
                          booking.phone
                        }</strong> to confirm the appointment. Please ensure you're available at the scheduled time.
                      </p>
                    </div>
                    
                    <p style="margin: 0 0 10px; font-size: 14px; color: #666666; line-height: 1.6;">
                      If you need to reschedule or have any questions, please don't hesitate to contact us.
                    </p>
                    
                    <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">
                      Best regards,<br>
                      <strong style="color: #333333;">Service Booking Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 10px; font-size: 12px; color: #999999;">
                      This is an automated confirmation email. Please do not reply to this message.
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #999999;">
                      © ${new Date().getFullYear()} Service Booking. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
};

export const SignUpEmail = async (register) => {
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
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px 0;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0 0 10px; color: #ffffff; font-size: 32px; font-weight: 600;">
                      Welcome Aboard! 🎉
                    </h1>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                      Your account has been created successfully
                    </p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px; font-size: 18px; color: #333333; line-height: 1.5;">
                      Hello <strong>${register.userName || "User"}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 25px; font-size: 16px; color: #666666; line-height: 1.6;">
                      Thank you for joining <strong style="color: #4CAF50;">Cool Service Store</strong>! We're excited to have you as part of our community.
                    </p>
                    
                    <!-- Account Details Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 6px; overflow: hidden; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 15px; font-size: 18px; color: #333333; font-weight: 600;">
                            Your Account Details
                          </h2>
                          
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 30%;">
                                <strong style="color: #333333;">Username:</strong>
                              </td>
                              <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                ${register.userName || "User"}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Email:</strong>
                              </td>
                              <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                ${register.email}
                              </td>
                            </tr>
                            ${
                              register.phone
                                ? `
                            <tr>
                              <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Phone:</strong>
                              </td>
                              <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                                ${register.phone}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- What You Can Do -->
                    <div style="background-color: #e8f5e9; border-left: 4px solid #4CAF50; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                      <h3 style="margin: 0 0 15px; font-size: 16px; color: #2e7d32;">
                        What You Can Do Now
                      </h3>
                      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555555; line-height: 1.8;">
                        <li>Browse our wide range of services</li>
                        <li>Book appointments at your convenience</li>
                        <li>Track your service requests</li>
                        <li>Manage your account preferences</li>
                        <li>Get exclusive offers and updates</li>
                      </ul>
                    </div>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td style="text-align: center; padding: 10px 0;">
                          <a href="${
                            process.env.WEBSITE_URL || "#"
                          }" style="display: inline-block; padding: 14px 35px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            Start Exploring
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Support Info -->
                    <div style="background-color: #fff3e0; border-left: 4px solid #FF9800; padding: 15px 20px; margin-bottom: 25px; border-radius: 4px;">
                      <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                        <strong style="color: #F57C00;">Need Help?</strong><br>
                        Our support team is here to assist you. Feel free to reach out if you have any questions or concerns.
                      </p>
                    </div>
                    
                    <p style="margin: 0 0 5px; font-size: 14px; color: #666666; line-height: 1.6;">
                      We're thrilled to have you with us!
                    </p>
                    
                    <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">
                      Best regards,<br>
                      <strong style="color: #333333;">Cool Service Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 10px; font-size: 13px; color: #666666;">
                      Stay connected with us:
                    </p>
                    <table role="presentation" style="margin: 0 auto 15px; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="#" style="color: #4CAF50; text-decoration: none; font-size: 12px;">Website</a>
                        </td>
                        <td style="padding: 0 10px; color: #cccccc;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="#" style="color: #4CAF50; text-decoration: none; font-size: 12px;">Support</a>
                        </td>
                        <td style="padding: 0 10px; color: #cccccc;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="#" style="color: #4CAF50; text-decoration: none; font-size: 12px;">Contact Us</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 0 0 5px; font-size: 12px; color: #999999;">
                      This email was sent to <strong style="color: #666666;">${
                        register.email
                      }</strong>
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #999999;">
                      © ${new Date().getFullYear()} Cool Service Store. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
};

export const alertUser = async (data) => {
  await sgMail.send({
    from: `"Home Appliance Service Store" <${process.env.EMAIL_USER}>`,
    to: data.email || process.env.ADMIN_EMAIL,
    subject: `Service Request Confirmed ✅ - #${data.requestId || "PENDING"}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px 0;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); padding: 35px 30px; text-align: center;">
                    <div style="background-color: rgba(255,255,255,0.2); width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 36px;">✅</span>
                    </div>
                    <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 28px; font-weight: 600;">
                      Request Confirmed
                    </h1>
                    <p style="margin: 0; color: #ffffff; font-size: 15px; opacity: 0.95;">
                      We've received your service request
                    </p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px; font-size: 18px; color: #333333; line-height: 1.5;">
                      Dear ${data.name || "Customer"},
                    </p>
                    
                    <p style="margin: 0 0 30px; font-size: 16px; color: #666666; line-height: 1.6;">
                      Thank you for choosing <strong style="color: #FF6B6B;">Home Appliance Service Store</strong>. Your service request has been successfully received and is now being processed.
                    </p>
                    
                    <!-- Request ID Badge -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td style="text-align: center; padding: 20px; background-color: #fff5f5; border-radius: 8px; border: 2px dashed #FF6B6B;">
                          <p style="margin: 0 0 8px; font-size: 13px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                            Request ID
                          </p>
                          <p style="margin: 0; font-size: 28px; color: #FF6B6B; font-weight: 700; letter-spacing: 1px;">
                            #${data.requestId || "12345"}
                          </p>
                          <p style="margin: 8px 0 0; font-size: 12px; color: #999999;">
                            Please save this ID for future reference
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Service Details -->
                    ${
                      data.appliance || data.issue || data.preferredDate
                        ? `
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 6px; overflow: hidden; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 18px; font-size: 18px; color: #333333; font-weight: 600;">
                            Service Request Details
                          </h2>
                          
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            ${
                              data.appliance
                                ? `
                            <tr>
                              <td style="padding: 10px 0; font-size: 14px; color: #666666; width: 40%;">
                                <strong style="color: #333333;">Appliance:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${data.appliance}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                            ${
                              data.issue
                                ? `
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Issue:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${data.issue}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                            ${
                              data.preferredDate
                                ? `
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Preferred Date:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${data.preferredDate}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                            ${
                              data.phone
                                ? `
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Contact:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${data.phone}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                            ${
                              data.address
                                ? `
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Service Address:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333;">
                                ${data.address}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                          </table>
                        </td>
                      </tr>
                    </table>
                    `
                        : ""
                    }
                    
                    <!-- Next Steps -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                      <h3 style="margin: 0 0 15px; font-size: 18px; color: #ffffff; font-weight: 600;">
                        🔄 What Happens Next?
                      </h3>
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 35px; vertical-align: top;">
                                  <div style="width: 28px; height: 28px; background-color: rgba(255,255,255,0.3); border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff; font-weight: 600; font-size: 13px;">1</div>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  <strong>Review:</strong> Our team reviews your request
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 35px; vertical-align: top;">
                                  <div style="width: 28px; height: 28px; background-color: rgba(255,255,255,0.3); border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff; font-weight: 600; font-size: 13px;">2</div>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  <strong>Assignment:</strong> We assign the best technician for your appliance
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 35px; vertical-align: top;">
                                  <div style="width: 28px; height: 28px; background-color: rgba(255,255,255,0.3); border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff; font-weight: 600; font-size: 13px;">3</div>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  <strong>Contact:</strong> Technician will call you within 24 hours to schedule
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 35px; vertical-align: top;">
                                  <div style="width: 28px; height: 28px; background-color: rgba(255,255,255,0.3); border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff; font-weight: 600; font-size: 13px;">4</div>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  <strong>Service:</strong> Expert service at your doorstep
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- Important Note -->
                    <div style="background-color: #fff8e1; border-left: 4px solid #FFC107; padding: 18px 20px; margin-bottom: 30px; border-radius: 4px;">
                      <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                        <strong style="color: #F57F17;">⏱️ Expected Response Time:</strong><br>
                        Our team typically assigns a technician within <strong>2-4 hours</strong> during business hours. You'll receive a confirmation call shortly.
                      </p>
                    </div>
                    
                    <!-- Track Request Button -->
                    ${
                      data.trackingUrl
                        ? `
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td style="text-align: center; padding: 10px 0;">
                          <a href="${data.trackingUrl}" style="display: inline-block; padding: 14px 35px; background-color: #FF6B6B; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            Track Your Request
                          </a>
                        </td>
                      </tr>
                    </table>
                    `
                        : ""
                    }
                    
                    <!-- Contact Support -->
                    <div style="background-color: #f0f7ff; border-left: 4px solid #2196F3; padding: 18px 20px; margin-bottom: 25px; border-radius: 4px;">
                      <p style="margin: 0 0 10px; font-size: 14px; color: #555555; line-height: 1.6;">
                        <strong style="color: #1976D2;">📞 Need Immediate Assistance?</strong>
                      </p>
                      <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                        Contact our support team: <strong style="color: #1976D2;">${
                          process.env.SUPPORT_PHONE || "1800-XXX-XXXX"
                        }</strong><br>
                        Email: <strong style="color: #1976D2;">${
                          process.env.SUPPORT_EMAIL || "support@homeservice.com"
                        }</strong><br>
                        <span style="font-size: 12px; color: #777777;">Available Mon-Sat: 9 AM - 7 PM</span>
                      </p>
                    </div>
                    
                    <p style="margin: 0 0 5px; font-size: 14px; color: #666666; line-height: 1.6;">
                      We appreciate your trust in our services.
                    </p>
                    
                    <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">
                      Warm regards,<br>
                      <strong style="color: #333333;">Home Appliance Service Store Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 10px; font-size: 13px; color: #666666;">
                      Reference: <strong style="color: #333333;">#${
                        data.requestId || "12345"
                      }</strong> | Date: ${new Date().toLocaleDateString(
      "en-IN",
      { day: "numeric", month: "short", year: "numeric" }
    )}
                    </p>
                    <table role="presentation" style="margin: 0 auto 15px; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="${
                            process.env.WEBSITE_URL || "#"
                          }" style="color: #FF6B6B; text-decoration: none; font-size: 12px;">Website</a>
                        </td>
                        <td style="padding: 0 10px; color: #cccccc;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="#" style="color: #FF6B6B; text-decoration: none; font-size: 12px;">Track Request</a>
                        </td>
                        <td style="padding: 0 10px; color: #cccccc;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="#" style="color: #FF6B6B; text-decoration: none; font-size: 12px;">Help Center</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 0 0 5px; font-size: 12px; color: #999999;">
                      This is an automated confirmation email.
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #999999;">
                      © ${new Date().getFullYear()} Home Appliance Service Store. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
};

export const TechReminder = async (job) => {
  await sgMail.send({
    from: `"Home Appliance Service Store" <${process.env.EMAIL_USER}>`,
    to: job.technicianEmail || process.env.ADMIN_EMAIL,
    subject: `🛠 New Job Assigned - Service #${job.id}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px 0;">
              <table role="presentation" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); padding: 30px; text-align: center;">
                    <div style="background-color: rgba(255,255,255,0.2); width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 36px;">🛠️</span>
                    </div>
                    <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 26px; font-weight: 600;">
                      New Job Assignment
                    </h1>
                    <p style="margin: 0; color: #ffffff; font-size: 15px; opacity: 0.95;">
                      Service Request #${job.id}
                    </p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 35px 30px;">
                    <p style="margin: 0 0 20px; font-size: 18px; color: #333333; line-height: 1.5;">
                      Hello <strong>${job.technician || "Technician"}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 30px; font-size: 16px; color: #666666; line-height: 1.6;">
                      A new service job has been assigned to you. Please review the details below and contact the customer to confirm the appointment.
                    </p>
                    
                    <!-- Priority Badge (if applicable) -->
                    ${
                      job.priority === "urgent" || job.priority === "high"
                        ? `
                    <div style="background-color: #fff3e0; border-left: 4px solid #FF9800; padding: 15px 20px; margin-bottom: 25px; border-radius: 4px;">
                      <p style="margin: 0; font-size: 14px; color: #E65100; font-weight: 600;">
                        ⚠️ ${
                          job.priority === "urgent" ? "URGENT" : "HIGH PRIORITY"
                        } - Please contact customer ASAP
                      </p>
                    </div>
                    `
                        : ""
                    }
                    
                    <!-- Job Details -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 6px; overflow: hidden; margin-bottom: 25px; border: 2px solid #e3f2fd;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 20px; font-size: 18px; color: #1565c0; font-weight: 600;">
                            📋 Job Details
                          </h2>
                          
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 12px 0; font-size: 14px; color: #666666; width: 35%; vertical-align: top;">
                                <strong style="color: #333333;">Service ID:</strong>
                              </td>
                              <td style="padding: 12px 0; font-size: 16px; color: #1565c0; font-weight: 700;">
                                #${job.id}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 12px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Appliance Type:</strong>
                              </td>
                              <td style="padding: 12px 0; font-size: 15px; color: #333333; font-weight: 600;">
                                ${job.appliance}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 12px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Problem Description:</strong>
                              </td>
                              <td style="padding: 12px 0; font-size: 14px; color: #d32f2f; line-height: 1.6;">
                                ${job.issue}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 12px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Scheduled Date:</strong>
                              </td>
                              <td style="padding: 12px 0; font-size: 15px; color: #333333;">
                                📅 ${job.date}${
      job.time ? ` at ${job.time}` : ""
    }
                              </td>
                            </tr>
                            ${
                              job.estimatedDuration
                                ? `
                            <tr style="border-top: 1px solid #e9ecef;">
                              <td style="padding: 12px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Est. Duration:</strong>
                              </td>
                              <td style="padding: 12px 0; font-size: 14px; color: #333333;">
                                ⏱️ ${job.estimatedDuration}
                              </td>
                            </tr>
                            `
                                : ""
                            }
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Customer Information -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fff9c4; border-radius: 6px; overflow: hidden; margin-bottom: 25px; border: 2px solid #fdd835;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 20px; font-size: 18px; color: #f57f17; font-weight: 600;">
                            👤 Customer Information
                          </h2>
                          
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 10px 0; font-size: 14px; color: #666666; width: 35%;">
                                <strong style="color: #333333;">Name:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 15px; color: #333333; font-weight: 600;">
                                ${job.name}
                              </td>
                            </tr>
                            <tr style="border-top: 1px solid #fff59d;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Phone:</strong>
                              </td>
                              <td style="padding: 10px 0;">
                                <a href="tel:${
                                  job.phone
                                }" style="font-size: 16px; color: #1565c0; text-decoration: none; font-weight: 600;">
                                  📞 ${job.phone}
                                </a>
                              </td>
                            </tr>
                            ${
                              job.email
                                ? `
                            <tr style="border-top: 1px solid #fff59d;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666;">
                                <strong style="color: #333333;">Email:</strong>
                              </td>
                              <td style="padding: 10px 0;">
                                <a href="mailto:${job.email}" style="font-size: 14px; color: #1565c0; text-decoration: none;">
                                  ${job.email}
                                </a>
                              </td>
                            </tr>
                            `
                                : ""
                            }
                            <tr style="border-top: 1px solid #fff59d;">
                              <td style="padding: 10px 0; font-size: 14px; color: #666666; vertical-align: top;">
                                <strong style="color: #333333;">Service Address:</strong>
                              </td>
                              <td style="padding: 10px 0; font-size: 14px; color: #333333; line-height: 1.6;">
                                📍 ${job.address}
                                ${
                                  job.landmark
                                    ? `<br><span style="color: #666666; font-size: 13px;">Landmark: ${job.landmark}</span>`
                                    : ""
                                }
                              </td>
                            </tr>
                          </table>
                          
                          ${
                            job.address
                              ? `
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                            <tr>
                              <td style="text-align: center;">
                                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  job.address
                                )}" style="display: inline-block; padding: 10px 20px; background-color: #f57f17; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: 600;">
                                  🗺️ Open in Google Maps
                                </a>
                              </td>
                            </tr>
                          </table>
                          `
                              : ""
                          }
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Action Required -->
                    <div style="background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%); border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                      <h3 style="margin: 0 0 15px; font-size: 18px; color: #ffffff; font-weight: 600;">
                        ✅ Action Required
                      </h3>
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 30px; vertical-align: top;">
                                  <span style="font-size: 18px;">1️⃣</span>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  Call the customer to confirm appointment time
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 30px; vertical-align: top;">
                                  <span style="font-size: 18px;">2️⃣</span>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  Review the problem description and prepare necessary tools
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 30px; vertical-align: top;">
                                  <span style="font-size: 18px;">3️⃣</span>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  Update job status in your dashboard
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 30px; vertical-align: top;">
                                  <span style="font-size: 18px;">4️⃣</span>
                                </td>
                                <td style="font-size: 14px; color: #ffffff; line-height: 1.6;">
                                  Complete the service and collect payment
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- Dashboard Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                      <tr>
                        <td style="text-align: center; padding: 15px 0;">
                          <a href="${
                            process.env.DASHBOARD_URL || "#"
                          }/technician/jobs/${
      job.id
    }" style="display: inline-block; padding: 16px 40px; background-color: #1e88e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 3px 6px rgba(0,0,0,0.2);">
                            📱 Open Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Important Notes -->
                    ${
                      job.specialInstructions || job.notes
                        ? `
                    <div style="background-color: #ffebee; border-left: 4px solid #e53935; padding: 18px 20px; margin-bottom: 25px; border-radius: 4px;">
                      <p style="margin: 0 0 8px; font-size: 14px; color: #c62828; font-weight: 600;">
                        📌 Special Instructions:
                      </p>
                      <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                        ${job.specialInstructions || job.notes}
                      </p>
                    </div>
                    `
                        : ""
                    }
                    
                    <!-- Support Info -->
                    <div style="background-color: #f0f7ff; border-left: 4px solid #2196F3; padding: 18px 20px; margin-bottom: 20px; border-radius: 4px;">
                      <p style="margin: 0 0 8px; font-size: 14px; color: #1976D2; font-weight: 600;">
                        💡 Need Assistance?
                      </p>
                      <p style="margin: 0; font-size: 13px; color: #555555; line-height: 1.6;">
                        Contact Support: <strong>${
                          process.env.SUPPORT_PHONE || "1800-XXX-XXXX"
                        }</strong><br>
                        Email: <strong>${
                          process.env.SUPPORT_EMAIL || "support@homeservice.com"
                        }</strong>
                      </p>
                    </div>
                    
                    <p style="margin: 0 0 5px; font-size: 14px; color: #666666; line-height: 1.6;">
                      Please ensure professional service and customer satisfaction.
                    </p>
                    
                    <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">
                      Best regards,<br>
                      <strong style="color: #333333;">Service Store Admin Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 10px; font-size: 13px; color: #666666;">
                      Job ID: <strong style="color: #1565c0;">#${
                        job.id
                      }</strong> | Assigned: ${new Date().toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    )}
                    </p>
                    <table role="presentation" style="margin: 0 auto 15px; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="${
                            process.env.DASHBOARD_URL || "#"
                          }" style="color: #1e88e5; text-decoration: none; font-size: 12px;">Dashboard</a>
                        </td>
                        <td style="padding: 0 10px; color: #cccccc;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="${
                            process.env.DASHBOARD_URL || "#"
                          }/help" style="color: #1e88e5; text-decoration: none; font-size: 12px;">Help Center</a>
                        </td>
                        <td style="padding: 0 10px; color: #cccccc;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="${
                            process.env.DASHBOARD_URL || "#"
                          }/guidelines" style="color: #1e88e5; text-decoration: none; font-size: 12px;">Service Guidelines</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 0; font-size: 12px; color: #999999;">
                      © ${new Date().getFullYear()} Home Appliance Service Store. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
};

export const forget = async (email, user, resetLink) => {
  try {
    await sgMail.send({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Link",
      html: `
        <h2>Password Reset Request</h2>
        <p>Hello ${user.userName},</p>
        <p>Click the link below to reset your password. This link will expire in 10 minutes:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });
    console.log("Password reset email sent successfully!");
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }
  }
};
