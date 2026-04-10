import TechnicianLocation from "../../Models/TechnicianLocation.model.js";
import User from "../../Models/User.model.js";
import Booking from "../../Models/Booking.model.js";
import { TechReminder } from "../../utils/Sendmails.js";
import redisClient from "../../config/redis.config.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { technicianLocationSchema } from "../../MiddleWare/Joi.middleware.js";

export const handleTech = async (req, res, next) => {
  try {
    const cacheKey = "Technicians";
    const cachedTechnicians = await redisClient.get(cacheKey);

    if (cachedTechnicians) {
      return res.status(200).json(
        new ApiResponse(200, JSON.parse(cachedTechnicians), "Technicians fetched (cached)")
      );
    }

    const technicians = await User.find({ userrole: "technician" }).select("-password").lean();

    if (!technicians || technicians.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No technicians found"));
    }

    await redisClient.setEx(cacheKey, 600, JSON.stringify(technicians)); // Cache for 10 mins

    return res.status(200).json(new ApiResponse(200, technicians, "Technicians fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteTech = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json(new ApiResponse(404, null, "Technician not found"));
    }

    // Invalidate caches
    await redisClient.del("Technicians");
    await redisClient.del(`technicianProfile:${req.params.id}`);

    return res.status(200).json(new ApiResponse(200, null, "Technician deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const UpdateTechnician = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { technician } = req.body;

    if (!technician) {
      return res.status(400).json(new ApiResponse(400, null, "Technician assignment is required"));
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { technician },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json(new ApiResponse(404, null, "Booking not found"));
    }

    try {
      await TechReminder(updatedBooking);
    } catch (err) {
      console.warn("[TechReminder] Failed to send notification:", err.message);
    }

    return res.status(200).json(
      new ApiResponse(200, updatedBooking, "Technician assigned successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const { error, value } = technicianLocationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.details[0].message));
    }

    const { technicianId, latitude, longitude } = value;
    const currentTechId = technicianId || req.user?.id || req.user?._id;

    if (!currentTechId) {
      return res.status(400).json(new ApiResponse(400, null, "Technician ID is required"));
    }

    const location = await TechnicianLocation.findOneAndUpdate(
      { technicianId: currentTechId },
      { latitude, longitude, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    return res.status(200).json(
      new ApiResponse(200, location, "Technician location updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getAllLocations = async (req, res, next) => {
  try {
    const locations = await TechnicianLocation.find()
      .populate("technicianId", "phone userName email avatar")
      .lean();

    if (!locations || locations.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No technician locations found"));
    }

    return res.status(200).json(new ApiResponse(200, locations, "Technician locations fetched successfully"));
  } catch (error) {
    next(error);
  }
};
