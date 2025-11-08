import { json } from "express";
import redisCLient from "../../config/redis.config.js";
import Booking from "../../Models/Booking.model.js";
import User from "../../Models/User.model.js";
import { generateBookingPDF } from "../../utils/generateBookingPDF.js";
import { sendBookEmail } from "../../utils/Sendmails.js";
import client from "../../config/redis.config.js";

export const Showbooking_Dashboard = async (req, res) => {
  try {
    const [total, newBooking, InProgress, Done] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "New" }),
      Booking.countDocuments({ status: "In Progress" }),
      Booking.countDocuments({ status: "Done" }),
    ]);

    res.status(200).json({ total, newBooking, InProgress, Done });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

export const bookData = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching booking", error });
  }
};

export const AddBooking = async (req, res) => {
  try {
    const newBooking = new Booking({ ...req.body, user: req.user.id });
    await newBooking.save();

    sendBookEmail(newBooking).catch((err) =>
      console.error("Email send failed:", err)
    );

    res.status(201).json({
      message: "Booking created successfully",
      newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking", error });
  }
};

export const ShowBooking = async (req, res) => {
  try {
    const redisBooking = await redisCLient.get("all_Bookings");

    if (redisBooking) {
      return res.status(200).json(JSON.parse(redisBooking));
    }

    const showdata = await Booking.find().sort({ date: -1 }).lean();
    await redisCLient.setEx("all_Bookings", 21600, JSON.stringify(showdata));

    res.status(200).json(showdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

export const DeleteBooking = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Booking.findByIdAndDelete(id);

    await redisCLient.del("all_Bookings");
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

export const UpdateBooking = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status field is required" });
    }
    const redisBooking = await redisCLient.get("all_Bookings");

    if (redisBooking) {
      return res.status(200).json(JSON.parse(redisBooking));
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await redisCLient.setEx("all_Bookings", 21600, JSON.stringify(updated));

    res.status(200).json({ message: "Booking updated successfully", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking", error });
  }
};

export const historyBookingPDF = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    generateBookingPDF(booking, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating booking PDF", error });
  }
};

export const searchData = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Please provide start and end dates" });
  }

  try {
    const filter = await Booking.find({
      issueDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .sort({ issueDate: -1 })
      .lean();

    res.status(200).json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error filtering bookings", error });
  }
};

export const getStatusBooking = async (req, res) => {
  const { status } = req.query;

  try {
    if (status === "all") {
      const bookings = await Booking.find({ user: req.user.id }).lean();

      if (bookings.length === 0) {
        return res
          .status(404)
          .json({ message: "No bookings found , book a service " });
      }

      return res.status(200).json(bookings);
    }

    const bookings = await Booking.find({
      $and: [{ status }, { user: req.user.id }],
    }).lean();

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found with this status" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

export const AdminStatusBooking = async (req, res) => {
  const { status } = req.query;

  try {
    if (status === "all") {
      const bookings = await Booking.find().lean();

      if (bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }
      return res.status(200).json(bookings);
    }

    const bookings = await Booking.find({ status }).lean();
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found with this status" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching admin bookings", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const redisUser = await redisCLient.get("users");

    if (redisUser) {
      return res.status(200).json(JSON.parse(redisUser));
    }
    const users = await User.find({ userrole: "customer" }).lean();
    await redisCLient.setEx("users", 21600, JSON.stringify(users));

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getBookingPerUser = async (req, res) => {
  const { id } = req.params;
  try {
    const redisBookingPerUser = await redisCLient.get(`booking:user:${id}`);

    if (redisBookingPerUser) {
      return res.status(200).json(JSON.parse(redisBookingPerUser));
    }

    const BookingPerUser = await Booking.find({ user: id }).lean();
    if (BookingPerUser.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }
    await redisCLient.setEx(
      `booking:user:${id}`,
      21600,
      JSON.stringify(BookingPerUser)
    );

    res.status(200).json(BookingPerUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user bookings", error });
  }
};
