import User from "../../Models/User.js";
import Admin from "../../Models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignUpEmail } from "../../utils/Sendmails.js";
import {
  userRegistrationSchema,
  loginRegisterSchema,
} from "../../MiddleWare/Joi.js";
import { uploadFile } from "../../utils/cloudinary.js";

export const login = async (req, res) => {
  try {
    const { error, value } = loginRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { phone, password, userrole } = value;
    let user;
    let role;
    if (userrole === "admin") {
      user = await Admin.findOne({ phone }).lean();
      if (user) role = "admin";
    } else {
      user = await User.findOne({ phone }).lean();
      role = user?.userrole;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, phone: user.phone, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(200).json({
      message: "Login successful",
      user,
      token,
      role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const signup = async (req, res) => {
  try {
    const { error, value } = userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, email, password, userrole, phone } = value;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      phone,
      password: hashPassword,
      userrole,
    });

    await newUser.save();

    try {
      await SignUpEmail(newUser);
    } catch (err) {
      console.error("Signup email failed:", err);
    }

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(201).json({
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userName, email, phone, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      {
        $set: {
          userName,
          email,
          phone,
          address: location,
        },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile fetched", user });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateImagePro = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const uploadResult = await uploadFile(req.file.path);
    const avatar = uploadResult?.secure_url;

    if (!avatar) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Avatar image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update image error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
