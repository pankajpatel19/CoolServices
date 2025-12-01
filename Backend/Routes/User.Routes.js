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
const router = Router();
// Login / Auth routes
router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.get("/currentUser", userAuth, currentuser);
router.get("/profile/:id", userAuth, fetchUser);
router.patch("/updateprofile", userAuth, updateProfile);
router.post(
  "/profile/upload",
  userAuth,
  upload.single("image"),
  updateImagePro
);
router;
export default router;
