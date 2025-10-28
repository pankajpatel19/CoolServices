const User = require("../../Models/User.js");
const Admin = require("../../Models/Admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SignUpEmail } = require("../../utils/Sendmails.js");
const {
  userRegistrationSchema,
  loginRegisterSchema,
} = require("../../MiddleWare/Joi.js");
const { uploadFile } = require("../../utils/cloudinary.js");

const login = async (req, res) => {
  try {
    const { error, value } = loginRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;

    let user = await User.findOne({ email }).lean();
    let role = user?.userrole;

    if (!user) {
      user = await Admin.findOne({ email }).lean();
      if (user) role = "admin";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role },
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

const signup = async (req, res) => {
  try {
    const { error, value } = userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, email, password, userrole } = value;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      userrole,
    });

    await newUser.save();

    SignUpEmail(newUser).catch((err) =>
      console.error("Signup email failed:", err)
    );

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

const logout = (req, res) => {
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

const updateProfile = async (req, res) => {
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

const fetchUser = async (req, res) => {
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

const updateImagePro = async (req, res) => {
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
module.exports = {
  login,
  signup,
  logout,
  updateProfile,
  fetchUser,
  updateImagePro,
};
