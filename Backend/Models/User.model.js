import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  refreshToken: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
