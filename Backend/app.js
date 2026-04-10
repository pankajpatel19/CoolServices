import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import errorMiddleware from "./MiddleWare/Error.middleware.js";

// Routes
import UserRoutes from "./Routes/User.Routes.js";
import ServiceRoutes from "./Routes/Service.Routes.js";
import BookingRoutes from "./Routes/Booking.Routes.js";
import TechnicianRoutes from "./Routes/Technician.Routes.js";
import ComplaintRoutes from "./Routes/Complain.Routes.js";
import AddressRoutes from "./Routes/Address.Routes.js";
import PaymentRoutes from "./Routes/Payment.Routes.js";
import AiRoutes from "./Routes/AI.Routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "https://cool-services-v918.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/users", UserRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/technicians", TechnicianRoutes);
app.use("/api/services", ServiceRoutes);
app.use("/api/complaints", ComplaintRoutes);
app.use("/api/address", AddressRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/ai", AiRoutes);

// Global Error Handler (Must be last)
app.use(errorMiddleware);

// Server Startup
app.listen(port, async () => {
  console.log(`[Server] Running on http://localhost:${port}`);
  try {
    await connectDB();
    console.log("[Database] Connected successfully");
  } catch (error) {
    console.error("[Database] Connection failed:", error.message);
    process.exit(1);
  }
});
