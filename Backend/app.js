require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoose
const mongoose = require("mongoose");
const Murl = process.env.MONGO_URL;

//cookie
const cookie = require("cookie-parser");
app.use(cookie());
//cors
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

const {
  login,
  signup,
  logout,
  updateProfile,
  fetchUser,
} = require("./Controller/User/AuthController");
const {
  AddBooking,
  Showbooking_Dashboard,
  ShowBooking,
  DeleteBooking,
  UpdateBooking,
  bookData,
  history,
  searchData,
  historyBookingPDF,
} = require("./Controller/Admin/Booking");
const userAuth = require("./MiddleWare/UserAuth");
const { techniciandata } = require("./Controller/Technician/technician");
const {
  handleTech,
  deleteTech,
  UpdateTechnician,
  updateLocation,
  getAllLocations,
} = require("./Controller/Technician/TechnicianData.js");
const checkRole = require("./MiddleWare/checkrole.js");

//login route
app.post("/login", login);
//register route
app.post("/signup", signup);
//logout route
app.get("/logout", logout);

//dashboard
app.get("/showbooking/dashboard", userAuth, Showbooking_Dashboard);

//simple route
app.post("/Home/addbooking", userAuth, checkRole(["customer"]), AddBooking);
app.get("/Home/history/:id", history);
app.get("/Home/history/:id/pdf", historyBookingPDF);

//show
app.get("/showbooking", userAuth, checkRole("admin"), ShowBooking);
app.get("/showbooking/search", searchData);
app.get("/showbooking/:id", bookData);

//delete booking
app.delete("/deletebooking/:id", userAuth, DeleteBooking);

//update
app.patch("/updatebooking/:id", userAuth, UpdateBooking);
app.patch("/updateTechnician/:id", UpdateTechnician);
app.get("/profile/:id", fetchUser);

app.put("/updateprofile", userAuth, updateProfile);

//technician
app.get("/api/techhome/getdata", techniciandata);
app.get("/handleTechnician", userAuth, handleTech);
app.delete("/handleTechnician/:id", userAuth, deleteTech);
app.post("/api/technician/update-location", updateLocation);
app.get("/api/admin/technicians-locations", getAllLocations);

// //demo
// app.get("/test", userAuth, (req, res) => {
//   console.log(req.user);
//   res.json({ message: "done" });
// });

//server
app.listen(port, (req, res) => {
  console.log("server Started");
  mongoose
    .connect(Murl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
