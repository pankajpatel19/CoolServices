const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  appliance: {
    type: String,
    required: [true, "Appliance type is required"],
    minlength: [2, "Appliance must be at least 2 characters"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  issue: {
    type: String,
    required: [true, "Issue description is required"],
    minlength: [5, "Issue must be at least 5 characters"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    match: [/^\d{6}$/, "Pincode must be 6 digits"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  name: {
    type: String,
    required: [true, "Customer name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  technician: {
    type: String,
    enum: ["ajay", "anuj", "rohit"],
    default: "ajay",
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Done", "cancel"],
    default: "New",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
