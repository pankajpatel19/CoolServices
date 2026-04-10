import User from "../../Models/User.model.js";
import Admin from "../../Models/Admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignUpEmail } from "../../utils/Sendmails.js";
import {
  userRegistrationSchema,
  loginRegisterSchema,
} from "../../MiddleWare/Joi.middleware.js";
import { uploadFile } from "../../utils/cloudinary.js";
import redisClient from "../../config/redis.config.js";
import { generateToken, verifyRefreshToken } from "../../jwt/tokens.js";
import RefreshToken from "../../Models/RefreshToken.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

export const login = async (req, res, next) => {
  try {
    const { error, value } = loginRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.details[0].message));
    }

    const { phone, password, userrole } = value;
    let user;

    if (userrole === "admin") {
      user = await Admin.findOne({ phone });
    } else {
      user = await User.findOne({ phone });
      if (user && user.userrole !== userrole) {
        return res.status(401).json(
          new ApiResponse(401, null, `You are registered as a ${user.userrole}, not a ${userrole}`)
        );
      }
    }

    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
    }

    const { accessToken, refreshToken } = generateToken(user);

    const refreshTokenHashed = await bcrypt.hash(refreshToken, 10);
    await RefreshToken.findOneAndUpdate(
      { user: user._id },
      { token: refreshTokenHashed },
      { upsert: true }
    );

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    const sanitizedUser = {
      id: user._id,
      userName: user.userName,
      userrole: user.userrole || "user",
      email: user.email
    };

    return res.status(200).json(
      new ApiResponse(200, { user: sanitizedUser, role: userrole }, "Login successful")
    );
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { error, value } = userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.details[0].message));
    }

    const { userName, email, password, phone } = value;

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(409).json(new ApiResponse(409, null, "User already exists with this phone number"));
    }

    const newUser = await User.create({
      userName,
      email,
      phone,
      password,
    });

    try {
      await SignUpEmail(newUser);
    } catch (err) {
      console.warn("[SignupEmail] Failed to send welcome email:", err.message);
    }

    const responseUser = newUser.toObject();
    delete responseUser.password;

    return res.status(201).json(
      new ApiResponse(201, responseUser, "Registration successful")
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (userId) {
      await RefreshToken.deleteOne({ user: userId });
    }

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    
    return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export const Refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json(new ApiResponse(401, null, "No refresh token provided"));
    }

    const payload = verifyRefreshToken(refreshToken);
    const tokenDb = await RefreshToken.findOne({ user: payload.id });

    if (!tokenDb) {
      return res.status(403).json(new ApiResponse(403, null, "Session expired, please log in again"));
    }

    const matchRefToken = await bcrypt.compare(refreshToken, tokenDb.token);
    if (!matchRefToken) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid refresh token"));
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user);

    // Rotate refresh token in DB
    const refreshTokenHashed = await bcrypt.hash(newRefreshToken, 10);
    await RefreshToken.findOneAndUpdate(
      { user: user._id },
      { token: refreshTokenHashed }
    );

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.status(200).json(new ApiResponse(200, null, "Token refreshed successfully"));
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return res.status(403).json(new ApiResponse(403, null, "Session invalid/expired"));
    }
    next(error);
  }
};

export const currentuser = async (req, res, next) => {
  try {
    const id = req.user?.id || req.user?._id;
    const user = await User.findById(id).select("-password -resetPasswordExpires -resetPasswordToken");

    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res.status(200).json(new ApiResponse(200, user, "Current user fetched"));
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userName, email, phone, location } = req.body;
    const userId = req.user?.id || req.user?._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
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
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    // Invalidate profile cache
    await redisClient.del(`userProfile:${userId}`);

    return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const fetchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `userProfile:${id}`;
    
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) {
      return res.status(200).json(new ApiResponse(200, JSON.parse(cachedUser), "Profile fetched (cached)"));
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    await redisClient.setEx(cacheKey, 300, JSON.stringify(user)); // Cache for 5 mins
    return res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
  } catch (error) {
    next(error);
  }
};

export const updateImagePro = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(new ApiResponse(400, null, "No image uploaded"));
    }

    const uploadResult = await uploadFile(req.file.path);
    const avatar = uploadResult?.secure_url;

    if (!avatar) {
      return res.status(500).json(new ApiResponse(500, null, "Image upload to Cloudinary failed"));
    }

    const userId = req.user?.id || req.user?._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    // Invalidate cache
    await redisClient.del(`userProfile:${userId}`);

    return res.status(200).json(new ApiResponse(200, updatedUser, "Avatar updated successfully"));
  } catch (error) {
    next(error);
  }
};
