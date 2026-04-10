import redisClient from "../../config/redis.config.js";
import Booking from "../../Models/Booking.model.js";
import User from "../../Models/User.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const techniciandata = async (req, res, next) => {
  try {
    const { username } = req.query;
    const techName = username || req.user?.userName;

    if (!techName) {
      return res.status(400).json(new ApiResponse(400, null, "Technician username is required"));
    }

    const techdata = await Booking.find({ technician: techName });

    if (!techdata || techdata.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No booking data found for this technician"));
    }

    return res.status(200).json(new ApiResponse(200, techdata, "Technician data fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const getTechnician = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const cacheKey = `technicianProfile:${userId}`;
    
    const cachedTech = await redisClient.get(cacheKey);
    if (cachedTech) {
      return res.status(200).json(
        new ApiResponse(200, JSON.parse(cachedTech), "Profile fetched (cached)")
      );
    }

    const tech = await User.findById(userId).select("-password");
    if (!tech) {
      return res.status(404).json(new ApiResponse(404, null, "Technician profile not found"));
    }

    await redisClient.setEx(cacheKey, 300, JSON.stringify(tech)); // Cache for 5 mins
    
    return res.status(200).json(
      new ApiResponse(200, tech, "Technician profile fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const TechStatusBooking = async (req, res, next) => {
  try {
    const { status, name } = req.query;
    const techName = name || req.user?.userName;

    if (!techName) {
      return res.status(400).json(new ApiResponse(400, null, "Technician name is required"));
    }

    const query = { technician: techName };
    if (status && status !== "all") {
      query.status = status;
    }

    const bookings = await Booking.find(query);

    if (!bookings || bookings.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No matching bookings found"));
    }

    return res.status(200).json(
      new ApiResponse(200, bookings, "Bookings fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};
