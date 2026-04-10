import redisClient from "../../config/redis.config.js";
import Booking from "../../Models/Booking.model.js";
import User from "../../Models/User.model.js";
import { generateBookingPDF } from "../../utils/generateBookingPDF.js";
import { sendBookEmail } from "../../utils/Sendmails.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import {
  bookingSchema,
  updateBookingSchema,
} from "../../MiddleWare/Joi.middleware.js";

export const Showbooking_Dashboard = async (req, res, next) => {
  try {
    const [total, newBooking, InProgress, Done] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "New" }),
      Booking.countDocuments({ status: "In Progress" }),
      Booking.countDocuments({ status: "Done" }),
    ]);

    return res.status(200).json(
      new ApiResponse(200, { total, newBooking, InProgress, Done }, "Dashboard stats fetched")
    );
  } catch (error) {
    next(error);
  }
};

export const bookData = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user", "userName email phone");
    if (!booking) {
      return res.status(404).json(new ApiResponse(404, null, "Booking not found"));
    }
    return res.status(200).json(new ApiResponse(200, booking, "Booking details fetched"));
  } catch (error) {
    next(error);
  }
};

export const AddBooking = async (req, res, next) => {
  try {
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.details[0].message));
    }

    const newBooking = await Booking.create({
      ...value,
      user: req.user?.id || req.user?._id,
      status: "New"
    });

    // Fire and forget email
    sendBookEmail(newBooking).catch((err) =>
      console.warn("[BookingEmail] Failed to send:", err.message)
    );

    // Invalidate caches
    await redisClient.del("all_Bookings");
    if (req.user?.id) await redisClient.del(`booking:user:${req.user.id}`);

    return res.status(201).json(new ApiResponse(201, newBooking, "Booking created successfully"));
  } catch (error) {
    next(error);
  }
};

export const ShowBooking = async (req, res, next) => {
  try {
    const cacheKey = "all_Bookings";
    const cachedBookings = await redisClient.get(cacheKey);

    if (cachedBookings) {
      return res.status(200).json(
        new ApiResponse(200, JSON.parse(cachedBookings), "All bookings fetched (cached)")
      );
    }

    const bookings = await Booking.find()
      .populate("user", "userName email phone")
      .sort({ createdAt: -1 })
      .lean();

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(bookings)); // Cache for 1 hour

    return res.status(200).json(new ApiResponse(200, bookings, "All bookings fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const DeleteBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json(new ApiResponse(404, null, "Booking not found"));
    }

    await Booking.findByIdAndDelete(id);

    // Invalidate caches
    await redisClient.del("all_Bookings");
    await redisClient.del(`booking:user:${booking.user}`);

    return res.status(200).json(new ApiResponse(200, null, "Booking deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const UpdateBooking = async (req, res, next) => {
  try {
    const { error, value } = updateBookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.details[0].message));
    }

    const { status, technician } = value;
    const id = req.params.id;

    const updated = await Booking.findByIdAndUpdate(
      id,
      { $set: { status, technician } },
      { new: true }
    ).populate("user", "userName email phone");

    if (!updated) {
      return res.status(404).json(new ApiResponse(404, null, "Booking not found"));
    }

    // Invalidate caches
    await redisClient.del("all_Bookings");
    await redisClient.del(`booking:user:${updated.user?._id || updated.user}`);

    return res.status(200).json(new ApiResponse(200, updated, "Booking updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const historyBookingPDF = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user", "userName email phone address");
    if (!booking) {
      return res.status(404).json(new ApiResponse(404, null, "Booking not found"));
    }
    generateBookingPDF(booking, res);
  } catch (error) {
    next(error);
  }
};

export const searchData = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json(new ApiResponse(400, null, "Start and end dates are required"));
    }

    const bookings = await Booking.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate("user", "userName email")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(new ApiResponse(200, bookings, "Filtered bookings fetched"));
  } catch (error) {
    next(error);
  }
};

export const getStatusBooking = async (req, res, next) => {
  try {
    const { status } = req.query;
    const userId = req.user?.id || req.user?._id;

    const query = { user: userId };
    if (status && status !== "all") {
      query.status = status;
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 }).lean();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No bookings found for the requested status"));
    }

    return res.status(200).json(new ApiResponse(200, bookings, "User bookings fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const AdminStatusBooking = async (req, res, next) => {
  try {
    const { status } = req.query;

    const query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate("user", "userName email")
      .sort({ createdAt: -1 })
      .lean();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No matching bookings found"));
    }

    return res.status(200).json(new ApiResponse(200, bookings, "Bookings filtered by status"));
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const cacheKey = "users_customer";
    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      return res.status(200).json(new ApiResponse(200, JSON.parse(cachedUsers), "Customers fetched (cached)"));
    }

    const users = await User.find({ userrole: "customer" }).select("-password").lean();
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(users));

    return res.status(200).json(new ApiResponse(200, users, "Customers fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const getBookingPerUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `booking:user:${id}`;
    
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(new ApiResponse(200, JSON.parse(cachedData), "User bookings fetched (cached)"));
    }

    const bookings = await Booking.find({ user: id }).sort({ createdAt: -1 }).lean();
    
    if (!bookings || bookings.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No bookings found for this user"));
    }

    await redisClient.setEx(cacheKey, 1800, JSON.stringify(bookings));

    return res.status(200).json(new ApiResponse(200, bookings, "User bookings fetched successfully"));
  } catch (error) {
    next(error);
  }
};
