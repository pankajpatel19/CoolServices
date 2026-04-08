import { Router } from "express";
import userAuth from "../MiddleWare/UserAuth.middleware.js";
import { upload } from "../MiddleWare/multer.midlleware.js";
import {
  login,
  signup,
  logout,
  updateProfile,
  fetchUser,
  updateImagePro,
  currentuser,
} from "../Controller/User/user.controller.js";
import {
  forgotPassword,
  resetPassword,
} from "../Controller/Password/forgot-Password.controller.js";

const router = Router();

// Authentication
router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.get("/current-user", userAuth, currentuser);

// Password Management
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Profile Management
router.get("/profile/:id", userAuth, fetchUser);
router.patch("/update-profile", userAuth, updateProfile);
router.post(
  "/profile/upload",
  userAuth,
  upload.single("image"),
  updateImagePro
);

export default router;
