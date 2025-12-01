import Groq from "groq-sdk";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import {
  forgotPassword,
  resetPassword,
} from "./Controller/Password/forgot-Password.controller.js";

const app = express();

import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API });

const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://cool-services.vercel.app", "http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
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

// import { authcheck, redirect } from "./Controller/google OAuth/redirect.js";

app.use("/api", UserRoutes);
app.use("/api", BookingRoutes);
app.use("/api", TechnicianRoutes);
app.use("/api/services", ServiceRoutes);
app.use("/api", ComplaintRoutes);
app.use("/api/customer", AddressRoutes);

// app.get("/auth/google", redirect);
// app.get("/auth/google/callback", authcheck);

app.post("/api/create-order", payment);
app.post("/api/verify-order", verifyPayment);

// Chat route
app.post("/home/chat", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Message required" });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: data,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";
    res.json({ text: reply });
  } catch (error) {
    console.error(
      "Error with groq API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/forgot-password", forgotPassword);
app.post("/api/reset-password/:token", resetPassword);

// Start server

const Murl = process.env.MONGO_URL;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  mongoose
    .connect(Murl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
