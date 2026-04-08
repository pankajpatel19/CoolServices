import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../Models/User.model.js";
import { forget } from "../../utils/Sendmails.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(new ApiResponse(400, null, "Email is required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User with this email does not exist"));
    }

    // Generate token valid for 10 minutes
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL || process.env.FRONTEND_HOST}/reset-password/${token}`;

    try {
      await forget(email, user, resetLink);
    } catch (emailError) {
      console.warn("[ForgotPassword] Email failed to send:", emailError.message);
      // We still return success because the token is generated, but ideally we'd log this.
    }

    return res.status(200).json(new ApiResponse(200, null, "Reset password link sent successfully"));
  } catch (error) {
    console.error("[ForgotPasswordError]:", error);
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json(new ApiResponse(400, null, "Password must be at least 6 characters long"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json(new ApiResponse(400, null, "Invalid or expired reset token"));
    }

    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json(new ApiResponse(400, null, "Reset link is invalid or has already been used"));
    }

    user.password = newPassword;
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json(new ApiResponse(200, null, "Password reset successfully. You can now log in."));
  } catch (error) {
    console.error("[ResetPasswordError]:", error);
    next(error);
  }
};
