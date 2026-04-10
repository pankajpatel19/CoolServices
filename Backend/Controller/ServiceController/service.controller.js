import redisClient from "../../config/redis.config.js";
import Service from "../../Models/Services.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const addService = async (req, res, next) => {
  try {
    const { appliance, name, price, videoUrl, description } = req.body;

    if (!appliance || !name || !price) {
      return res.status(400).json(new ApiResponse(400, null, "Appliance, name, and price are required"));
    }

    const service = await Service.create({
      appliance,
      name,
      price,
      videoUrl,
      description,
    });

    // Invalidate the cache for this appliance category
    await redisClient.del(`appliance:${appliance.toLowerCase()}`);

    return res.status(201).json(
      new ApiResponse(201, service, "Service added successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getServicesByAppliance = async (req, res, next) => {
  try {
    const { appliance } = req.query;
    if (!appliance) {
      return res.status(400).json(new ApiResponse(400, null, "Appliance category is required"));
    }

    const cacheKey = `appliance:${appliance.toLowerCase()}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(
        new ApiResponse(200, JSON.parse(cachedData), "Services fetched (cached)")
      );
    }

    const services = await Service.find({ appliance: new RegExp(`^${appliance}$`, "i") });

    // Cache for 6 hours
    await redisClient.setEx(
      cacheKey,
      21600,
      JSON.stringify(services),
    );

    return res.status(200).json(
      new ApiResponse(200, services, "Services fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};
