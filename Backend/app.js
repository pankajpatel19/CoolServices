import dotenv from "dotenv";
import Groq from "groq-sdk";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { upload } from "./MiddleWare/multer.js";
import {
  login,
  signup,
  logout,
  updateProfile,
  fetchUser,
  updateImagePro,
} from "./Controller/User/AuthController.js";

import {
  AddBooking,
  Showbooking_Dashboard,
  ShowBooking,
  DeleteBooking,
  UpdateBooking,
  bookData,
  history,
  searchData,
  historyBookingPDF,
  getStatusBooking,
  AdminStatusBooking,
  getUsers,
  getBookingPerUser,
} from "./Controller/Admin/Booking.js";

import userAuth from "./MiddleWare/UserAuth.js";

import {
  techniciandata,
  getTechnician,
  TechStatusBooking,
} from "./Controller/Technician/technician.js";

import {
  handleTech,
  deleteTech,
  UpdateTechnician,
  updateLocation,
  getAllLocations,
} from "./Controller/Technician/TechnicianData.js";

import {
  SubmitComplaints,
  ShowComplaints,
} from "./Controller/Complain/complain.js";

// 🔹 Load environment variables
dotenv.config();

// 🔹 Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API });

// 🔹 Initialize Express
const app = express();
const port = process.env.PORT || 8888;

// 🔹 Middleware
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

// 🔹 MongoDB Connection
const Murl = process.env.MONGO_URL;

// ========== ROUTES ==========

// Login / Auth routes
app.post("/login", login);
app.post("/signup", signup);
app.get("/logout", logout);

// Booking routes
app.post("/Home/addbooking", userAuth, AddBooking);
app.get("/Home/history/status", userAuth, getStatusBooking);
app.get("/Home/history/:id", history);
app.get("/Home/history/:id/pdf", historyBookingPDF);
app.post("/Home/Complaint", userAuth, SubmitComplaints);
app.get("/Home/Complaint/:id", userAuth, ShowComplaints);

// Show bookings
app.get("/showbooking", userAuth, ShowBooking);
app.get("/showbooking/search", searchData);
app.get("/showbooking/status", userAuth, AdminStatusBooking);

// Dashboard
app.get("/showbooking/dashboard", userAuth, Showbooking_Dashboard);
app.get("/handleTechnician", userAuth, handleTech);
app.get("/api/admin/users", userAuth, getUsers);
app.get("/api/admin/getBookingPerUser/:id", userAuth, getBookingPerUser);

// Bookings - CRUD
app.get("/showbooking/:id", bookData);
app.delete("/deletebooking/:id", userAuth, DeleteBooking);
app.patch("/updatebooking/:id", UpdateBooking);
app.patch("/updateTechnician/:id", UpdateTechnician);
app.get("/profile/:id", fetchUser);

app.patch("/updateprofile", userAuth, updateProfile);
app.post("/profile/upload", userAuth, upload.single("image"), updateImagePro);

// Technician routes
app.get("/api/techhome/getdata", techniciandata);
app.delete("/handleTechnician/:id", userAuth, deleteTech);
app.post("/api/technician/update-location", updateLocation);
app.get("/api/admin/technicians-locations", getAllLocations);
app.get("/Techprofile", userAuth, getTechnician);
app.get("/api/status", userAuth, TechStatusBooking);

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

// User location service
const serviceArea = [
  "Navsari City",
  "Gandevi",
  "Chikhli",
  "Mollakhadi",
  "Vejalpur",
  "Bhimrad",
  "Dandi",
  "Khergam",
  "Pardi",
  "Amalsad",
  "Vastrapur",
  "Navrangpura",
  "Satellite",
  "Bodakdev",
  "Paldi",
  "Maninagar",
  "Thaltej",
  "Naranpura",
  "Bapunagar",
  "Gota",
  "Ambawadi",
  "Ellisbridge",
  "Isanpur",
  "Odhav",
  "Vejalpur",
  "Kankaria",
  "Sarkhej",
  "Motera",
  "Gandhinagar Road",
  "Khodiyar",
  "Naroda",
  "New Ranip",
  "Old Ranip",
  "Juhapura",
  "Chandkheda",
  "Vejalpur",
  "Vasna",
  "Vishala",
];

app.get("/home/userLocation", (req, res) => {
  res.json({ serviceArea });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  mongoose
    .connect(Murl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
