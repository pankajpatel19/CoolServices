require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//jwt cookie
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
//mongoose
const mongoose = require("mongoose");
const Murl = process.env.MONGO_URL;

//email
const sendBookEmail = require("./utils/Sendmails");
// const SendSMS = require("./utils/SendSMS");

//cors
const cors = require("cors");
const alloworigin = [
  "https://cool-services.vercel.app",
  "http://localhost:5173",
];
app.use(cors({ origin: alloworigin, credentials: true }));

//models
const Booking = require("./Models/Booking");
const Admin = require("./Models/Admin");
const User = require("./Models/User");
const bcrypt = require("bcrypt");

//login route
app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  console.log(username, password);

  try {
    let user = await User.findOne({ userName: username });
    let role = "user";

    if (!user) {
      user = await Admin.findOne({ Name: username });
      role = "admin";
    }
    if (!user) {
      console.log("user not found");
      res.status(401).json({ message: "Invalid Credit" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log("password not found");

      return res.status(401).json({ message: "password incorrect" });
    }

    //token
    let token = jwt.sign({ email: user.email, role }, "pankaj", {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    //-----------

    res.json({ message: "login successfully", user, token, role });
  } catch (error) {
    res.status(401).json({ message: "login failed" });
  }
});

//register route
app.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;

  try {
    const find = await User.find({ email: email });
    console.log(find);

    if (!find.length == 0) {
      return res.status(401).json({ message: "User Already Exists!!!" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName: username,
      email: email,
      password: hashpassword,
    });

    await user.save();

    res.json({ message: "Register SuccesFully", user });
  } catch (error) {
    res.json({ message: error });
  }
});

//dashboard
app.get("/showbooking/dashboard", async (req, res) => {
  try {
    console.log("dashboard");
    const total = await Booking.countDocuments();
    const newBooking = await Booking.countDocuments({ status: "New" });
    const InProgress = await Booking.countDocuments({ status: "In progress" });
    const Done = await Booking.countDocuments({ status: "Done" });
    res.json({ total, newBooking, InProgress, Done });
  } catch (error) {
    res.json({ message: "No Bookings" });
  }
});
//simple route
app.post("/addbooking", async (req, res) => {
  const newBooking = new Booking({ ...req.body });
  await sendBookEmail(newBooking);
  // await SendSMS(newBooking);
  await newBooking.save();
  res.json({ message: "Booking Successfully", newBooking });
});

//show
app.get("/showbooking", async (req, res) => {
  const showdata = await Booking.find({});
  res.json(showdata);
});

//delete booking
app.delete("/deletebooking/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletebook = await Booking.findByIdAndDelete(id);
    if (!deletebook) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
});

//update
app.patch("/updatebooking/:id", async (req, res) => {
  let id = req.params.id;
  const updatebook = await Booking.findByIdAndUpdate(id, {
    status: req.body.status,
  });
  res.json(updatebook);
});

//server
app.listen(port, (req, res) => {
  console.log("server Started");
  mongoose
    .connect(Murl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
