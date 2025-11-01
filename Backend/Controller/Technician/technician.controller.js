import redisCLient from "../../config/redis.config.js";
import Booking from "../../Models/Booking.model.js";
import User from "../../Models/User.model.js";

export const techniciandata = async (req, res) => {
  const { username } = req.query;

  try {
    const redis_Technician_Bookings = await redisCLient.get(
      "Technician_Bookings"
    );
    if (redis_Technician_Bookings) {
      const techBookings = JSON.parse(redis_Technician_Bookings);
      return res.status(200).json(techBookings);
    }
    const techdata = await Booking.find({ technician: username });

    if (!techdata || techdata.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    console.log(techdata);
    await redisCLient.setEx(
      "Technician_Bookings",
      60,
      JSON.stringify(techdata)
    );

    res.status(200).json(techdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching technician data", error });
  }
};

export const getTechnician = async (req, res) => {
  try {
    const redisTechnician = await redisCLient.get("handle_Technician");

    if (redisTechnician) {
      const tech = JSON.parse(redisTechnician);
      return res
        .status(200)
        .json({ message: "Fetching Details SuccessFully", tech });
    }

    const tech = await User.findById(req.user.id);

    if (!tech) {
      return res.status(404).json({ message: "Technician not found" });
    }
    await redisCLient.setEx("handle_Technician", 60, JSON.stringify(tech));
    res.status(200).json({
      message: "Fetching details successfully",
      tech,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching details", error });
  }
};

export const TechStatusBooking = async (req, res) => {
  const { status, name } = req.query;

  try {
    if (status === "all") {
      const bookings = await Booking.find({ technician: name });

      if (bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }

      return res.status(200).json({
        message: "Fetched successfully",
        bookings,
      });
    }

    const bookings = await Booking.find({
      technician: name,
      status: status,
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found with status" });
    }

    res.status(200).json({
      message: "Fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
