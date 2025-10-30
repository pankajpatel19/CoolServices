import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../Models/User.model.js";
import { forget } from "../../utils/Sendmails.js";
import dotenv from "dotenv";
dotenv.config();

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    // Generate token valid for 10 minutes
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.FRONTEND_PRODUCTION_VERCEL}/reset-password/${token}`;

    await forget(email, user, resetLink);

    res.json({ message: "Reset password link sent successfully" });
  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ------------------ Reset Password ------------------

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "Invalid token" });

    if (user.resetPasswordExpires < Date.now())
      return res.status(400).json({ message: "Token expired" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
