const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookEmail = async (booking) => {
  await transporter.sendMail({
    from: `"Service Booking" <${process.env.EMAIL_USER}>`,
    to: booking.email || process.env.ADMIN_EMAIL,
    subject: "Service Booking Confirmed",
    html: `
      <h3>Hello ${booking.name},</h3>
      <p>Your service for <b>${booking.appliance}</b> has been booked.</p>
      <p><b>Issue:</b> ${booking.issue}</p>
      <p><b>Date:</b> ${booking.date} at ${booking.time}</p>
      <p>We'll contact you at ${booking.phone}.</p>
      <p>Thank you!</p>
    `,
  });
};

module.exports = sendBookEmail;
