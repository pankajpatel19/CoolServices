import { Router } from "express";
import {
  AddBooking,
  Showbooking_Dashboard,
  ShowBooking,
  DeleteBooking,
  UpdateBooking,
  bookData,
  searchData,
  historyBookingPDF,
  getStatusBooking,
  AdminStatusBooking,
  getUsers,
  getBookingPerUser,
} from "../Controller/Admin/Booking.controller.js";
import userAuth from "../MiddleWare/UserAuth.middleware.js";
import checkRole from "../MiddleWare/Role.middleware.js";

const router = Router();

// User Routes
router.post("/Home/addbooking", userAuth, AddBooking);
router.get("/Home/history/status", userAuth, getStatusBooking);
router.get("/Home/history/:id/pdf", userAuth, historyBookingPDF);

// Admin/Technician Management Routes
router.get("/showbooking", userAuth, checkRole(["admin", "technician"]), ShowBooking);
router.get("/showbooking/search", userAuth, checkRole(["admin"]), searchData);
router.get("/showbooking/status", userAuth, checkRole(["admin", "technician"]), AdminStatusBooking);
router.get("/showbooking/dashboard", userAuth, checkRole(["admin"]), Showbooking_Dashboard);
router.get("/showbooking/:id", userAuth, checkRole(["admin", "technician"]), bookData);

// Admin-Only Routes
router.get("/admin/users", userAuth, checkRole(["admin"]), getUsers);
router.get("/admin/getBookingPerUser/:id", userAuth, checkRole(["admin"]), getBookingPerUser);
router.delete("/deletebooking/:id", userAuth, checkRole(["admin"]), DeleteBooking);
router.patch("/updatebooking/:id", userAuth, checkRole(["admin", "technician"]), UpdateBooking);

export default router;
