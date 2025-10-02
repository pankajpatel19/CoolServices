const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: "0000000000",
  },
  joinAt: {
    type: Date,
    default: Date.now,
  },
  userrole: {
    type: String,
    enum: ["customer", "technician", "admin"],
    required: true,
  },
  avatar: {
    type: String,
  },
  coverImage: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
