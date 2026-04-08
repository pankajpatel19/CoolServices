import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import {
  forgotPassword,
  resetPassword,
} from "./Controller/Password/forgot-Password.controller.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 8888;
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "https://cool-services.vercel.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser requests (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

import ServiceRoutes from "./Routes/Service.Routes.js";
import UserRoutes from "./Routes/User.Routes.js";
import BookingRoutes from "./Routes/Booking.Routes.js";
import TechnicianRoutes from "./Routes/Technician.Routes.js";
import ComplaintRoutes from "./Routes/Complain.Routes.js";
import AddressRoutes from "./Routes/Address.Routes.js";
import {
  payment,
  verifyPayment,
} from "./Controller/payment/razorpay.controller.js";
import userAuth from "./MiddleWare/UserAuth.middleware.js";
import connectDB from "./config/db.config.js";
import errorMiddleware from "./MiddleWare/Error.middleware.js";
import { getAIResponse } from "./Controller/User/ai.controller.js";

app.use("/api", UserRoutes);
app.use("/api", BookingRoutes);
app.use("/api", TechnicianRoutes);
app.use("/api/services", ServiceRoutes);
app.use("/api", ComplaintRoutes);
app.use("/api/customer", AddressRoutes);

app.post("/api/create-order", userAuth, payment);
app.post("/api/verify-order", userAuth, verifyPayment);

app.post("/home/chat", userAuth, getAIResponse);

app.post("/api/forgot-password", forgotPassword);
app.post("/api/reset-password/:token", resetPassword);

// Global Error Handler (Must be last)
app.use(errorMiddleware);

// Start server

// const Murl = process.env.MONGO_URL;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  connectDB();
});
