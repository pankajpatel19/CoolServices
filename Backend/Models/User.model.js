import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  google_id: {
    type: String,
  },
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
    default: "customer",
  },
  avatar: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
