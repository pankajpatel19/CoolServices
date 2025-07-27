const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  appliance: String,
  issue: String,
  address: String,
  pincode: String,
  date: String,
  time: String,
  name: String,
  phone: String,
  email: String,
  status: {
    type: String,
    enum: ["New", "In Progress", "Done"],
    default: "New",
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
