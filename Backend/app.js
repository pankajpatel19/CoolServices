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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
const { upload } = require("./MiddleWare/multer.js");

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

app.patch("/updateprofile", userAuth, updateProfile);

// upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "coverImage", maxCount: 1 },
// ]),
//technician
app.get("/api/techhome/getdata", techniciandata);
app.get("/handleTechnician", userAuth, handleTech);
app.delete("/handleTechnician/:id", userAuth, deleteTech);
app.post("/api/technician/update-location", updateLocation);
app.get("/api/admin/technicians-locations", getAllLocations);

//chat
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

app.post("/home/chat", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Message required" });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: data }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error while getting AI response:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
//user location
// const serviceArea = [
//   "Navsari City",
//   "Gandevi",
//   "Chikhli",
//   "Mollakhadi",
//   "Vejalpur",
//   "Bhimrad",
//   "Dandi",
//   "Khergam",
//   "Pardi",
//   "Amalsad",
//   //ahmadabad
//   "Vastrapur",
//   "Navrangpura",
//   "Satellite",
//   "Bodakdev",
//   "Paldi",
//   "Maninagar",
//   "Thaltej",
//   "Naranpura",
//   "Bapunagar",
//   "Gota",
//   "Ambawadi",
//   "Ellisbridge",
//   "Isanpur",
//   "Odhav",
//   "Vejalpur",
//   "Kankaria",
//   "Sarkhej",
//   "Motera",
//   "Gandhinagar Road",
//   "Khodiyar",
//   "Naroda",
//   "New Ranip",
//   "Old Ranip",
//   "Juhapura",
//   "Chandkheda",
//   "Vejalpur",
//   "Vasna",
//   "Vishala",
// ];

// app.get("/home/userLocation", (req, res) => {
//   res.json({ serviceArea });
// });

//server
app.listen(port, (req, res) => {
  console.log("server Started");
  mongoose
    .connect(Murl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
