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
import validate from "../MiddleWare/Validate.middleware.js";
import {
  userRegistrationSchema,
  loginRegisterSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../MiddleWare/Joi.middleware.js";

const router = Router();

// Authentication
router.post("/login", validate(loginRegisterSchema), login);
router.post("/signup", validate(userRegistrationSchema), signup);
router.get("/logout", logout);
router.get("/current-user", userAuth, currentuser);

// Password Management
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

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
