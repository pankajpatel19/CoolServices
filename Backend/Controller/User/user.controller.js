import User from "../../Models/User.model.js";
import Admin from "../../Models/Admin.model.js";
import bcrypt from "bcrypt";
import { SignUpEmail } from "../../utils/Sendmails.js";
import {
  userRegistrationSchema,
  loginRegisterSchema,
} from "../../MiddleWare/Joi.middleware.js";
import { uploadFile } from "../../utils/cloudinary.js";
import redisCLient from "../../config/redis.config.js";
import { generateToken, verifyRefreshToken } from "../../jwt/tokens.js";
import RefreshToken from "../../Models/RefreshToken.js";

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
      user = await Admin.findOne({ phone });
      if (user) role = "admin";
    } else {
      user = await User.findOne({ phone });

      if (user && user.userrole !== userrole) {
        return res.status(401).json({
          message: `You are registered as a ${user.userrole}, not a ${userrole}`,
        });
      }

      role = user?.userrole;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: "invalid credential" });
    }

    const { accessToken, refreshToken } = generateToken(user);

    const refreshTokenhashed = await bcrypt.hash(refreshToken, 10);
    const newReftoken = await RefreshToken.findOneAndUpdate(
      {
        user: user._id,
      },
      { token: refreshTokenhashed },
      {
        upsert: true,
        new: true,
      },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    });

    const senitizeUser = {
      id: user._id,
      userName: user.userName,
    };

    res.status(200).json({
      message: "Login successful",
      user: senitizeUser,
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

    const { userName, email, password, phone } = value;

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({
      userName,
      email,
      phone,
      password,
    });

    await newUser.save();

    try {
      await SignUpEmail(newUser);
    } catch (err) {
      console.error("Signup email failed:", err);
    }

    res.status(201).json({
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const logout = async (req, res) => {
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

export const Refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401);
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    const tokendb = await Refresh.findOne({ user: payload.id });

    if (!tokendb) {
      return res.status(403).json({ message: "Token Not found" });
    }

    const matchRefToken = await bcrypt.compare(refreshToken, tokendb.token);

    if (!matchRefToken) {
      return res.status(401).json({ message: "token Not matched" });
    }
    const newAccessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1000 * 60 * 15, // 15 minute
    });
    return res.status(200).json({ message: "token refreshed" });
  } catch (error) {
    console.log("Error", error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(403).json({
        message: "Refresh token is invalid or expired. Please log in again.",
      });
    }
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const currentuser = async (req, res) => {
  try {
    const { id } = req.user;
    const currUser = await User.findById(id).select(
      "-password -resetPasswordExpires -resetPasswordToken",
    );

    return res.status(201).json(currUser);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
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
      { new: true },
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
    const redisprofileuser = await redisCLient.get("userProfile");

    if (redisprofileuser) {
      const user = JSON.parse(redisprofileuser);
      return res.status(200).json({ message: "Profile Fetched", user });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await redisCLient.setEx("userProfile", 60, JSON.stringify(user));
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
      { new: true },
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
