import Booking from "../../Models/Booking.js";
import User from "../../Models/User.js";

export const techniciandata = async (req, res) => {
  const { username } = req.query;

  try {
    const techdata = await Booking.find({ technician: username });

    if (!techdata || techdata.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(techdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching technician data", error });
  }
};

export const getTechnician = async (req, res) => {
  try {
    const tech = await User.findById(req.user.id);

    if (!tech) {
      return res.status(404).json({ message: "Technician not found" });
    }

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
