const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  appliance: String,
  company: String,
  issue: String,
  address: String,
  pincode: String,
  date: String,
  time: String,
  name: String,
  phone: String,
  email: String,
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
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
