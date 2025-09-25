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
const SignUpEmail = async (register) => {
  await transporter.sendMail({
    from: `"Service Booking" <${process.env.EMAIL_USER}>`,
    to: register.email || process.env.ADMIN_EMAIL,
    subject: "Successfully Registered - Cool Service Store",
    html: `
    
      <h3>Hello ${register.userName || "User"},</h3>
      <p>You have successfully registered on <b>Cool Service Store</b>.</p>
      <p>Welcome to our store!</p>
      <p>Enjoy browsing and booking our services.</p>
      <p>We'll contact you at <strong>${register.email}</strong> if needed.</p>
      <br/>
      <p>Thank you,<br/>Cool Service Team</p>
    `,
  });
};

const alertUser = async (data) => {
  await transporter.sendMail({
    from: `"Home Appliance Service Store" <${process.env.EMAIL_USER}>`,
    to: data.email || process.env.ADMIN_EMAIL, // kisko bhejna hai
    subject: "Service Request Confirmed ✅",
    html: `
    <h2>Dear Customer,</h2>
    <p>Your service request <b>#12345</b> has been received.</p>
    <p>We will assign a technician shortly.</p>
    <br>
    <p>Regards,<br>Home Appliance Service Store</p>
  `,
  });
};

const TechReminder = async (job) => {
  await transporter.sendMail({
    from: '"Home Appliance Service Store" <your_email@gmail.com>',
    to: "lakshmicartt@gmail.com",
    subject: `🛠 New Job Assigned - Service #${job.id}`,
    html: `
      <h2>Hello ${job.technician},</h2>
      <p>A new job has been assigned to you.</p>
      <h3>Job Details:</h3>
      <ul>
        <li><b>Service ID:</b> ${job.id}</li>
        <li><b>Customer:</b> ${job.name}</li>
        <li><b>Contact:</b> ${job.phone}</li>
        <li><b>Appliance:</b> ${job.appliance}</li>
        <li><b>Problem:</b> ${job.issue}</li>
        <li><b>Address:</b> ${job.address}</li>
        <li><b>Scheduled Date:</b> ${job.date}</li>
      </ul>
      <br>
      <p>Please login to your dashboard to update status.</p>
      <p>Regards,<br>Service Store Admin</p>`,
  });
};

module.exports = { sendBookEmail, SignUpEmail, alertUser, TechReminder };
