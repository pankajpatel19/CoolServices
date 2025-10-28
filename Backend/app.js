require("dotenv").config();
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API });

const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
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
    origin: ["https://cool-services.vercel.app", "http://localhost:5173"],
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
  updateImagePro,
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
  getStatusBooking,
  AdminStatusBooking,
  getUsers,
  getBookingPerUser,
} = require("./Controller/Admin/Booking");
const userAuth = require("./MiddleWare/UserAuth");
const {
  techniciandata,
  getTechnician,
  TechStatusBooking,
} = require("./Controller/Technician/technician");
const {
  handleTech,
  deleteTech,
  UpdateTechnician,
  updateLocation,
  getAllLocations,
} = require("./Controller/Technician/TechnicianData.js");
const { upload } = require("./MiddleWare/multer.js");
const {
  SubmitComplaints,
  ShowComplaints,
} = require("./Controller/Complain/complain.js");

//login route
app.post("/login", login);
//register route
app.post("/signup", signup);
//logout route
app.get("/logout", logout);

//simple route
app.post("/Home/addbooking", userAuth, AddBooking);
app.get("/Home/history/status", userAuth, getStatusBooking);
app.get("/Home/history/:id", history);
app.get("/Home/history/:id/pdf", historyBookingPDF);
app.post("/Home/Complaint", userAuth, SubmitComplaints);
app.get("/Home/Complaint/:id", userAuth, ShowComplaints);

//show
app.get("/showbooking", userAuth, ShowBooking);
app.get("/showbooking/search", searchData);
app.get("/showbooking/status", userAuth, AdminStatusBooking);

//dashboard
app.get("/showbooking/dashboard", userAuth, Showbooking_Dashboard);
app.get("/handleTechnician", userAuth, handleTech);
app.get("/api/admin/users", userAuth, getUsers);
app.get("/api/admin/getBookingPerUser/:id", userAuth, getBookingPerUser);

app.get("/showbooking/:id", bookData);
//delete booking
app.delete("/deletebooking/:id", userAuth, DeleteBooking);
//update
app.patch("/updatebooking/:id", UpdateBooking);
app.patch("/updateTechnician/:id", UpdateTechnician);
app.get("/profile/:id", fetchUser);

app.patch("/updateprofile", userAuth, updateProfile);
app.post("/profile/upload", userAuth, upload.single("image"), updateImagePro);

//technician
app.get("/api/techhome/getdata", techniciandata);
app.delete("/handleTechnician/:id", userAuth, deleteTech);
app.post("/api/technician/update-location", updateLocation);
app.get("/api/admin/technicians-locations", getAllLocations);
app.get("/Techprofile", userAuth, getTechnician);
app.get("/api/status", userAuth, TechStatusBooking);

//chat

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

//server
app.listen(port, (req, res) => {
  console.log(`server Started on http://localhost:${port}`);
  mongoose
    .connect(Murl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
// user location
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
  //ahmadabad
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
