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

const router = Router();

router.post("/Home/addbooking", userAuth, AddBooking);

router.get("/Home/history/status", userAuth, getStatusBooking);

// router.get("/Home/history/:id", userAuth, history);

router.get("/Home/history/:id/pdf", userAuth, historyBookingPDF);

router.get("/showbooking", userAuth, ShowBooking);

router.get("/showbooking/search", searchData);

router.get("/showbooking/status", userAuth, AdminStatusBooking);

router.get("/showbooking/dashboard", userAuth, Showbooking_Dashboard);

router.get("/admin/users", userAuth, getUsers);

router.get("/admin/getBookingPerUser/:id", userAuth, getBookingPerUser);

router.get("/showbooking/:id", userAuth, bookData);
router.delete("/deletebooking/:id", userAuth, DeleteBooking);

router.patch("/updatebooking/:id", userAuth, UpdateBooking);

export default router;
