const Booking = require("../../Models/Booking");
const User = require("../../Models/User");
const generateBookingPDF = require("../../utils/generateBookingPDF");
const { sendBookEmail } = require("../../utils/Sendmails");

const Showbooking_Dashboard = async (req, res) => {
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

const bookData = async (req, res) => {
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

const AddBooking = async (req, res) => {
  try {
    const { service, issueDate } = req.body;

    if (!service || !issueDate) {
      return res
        .status(400)
        .json({ message: "Missing required fields (service, issueDate)" });
    }

    const newBooking = new Booking({ ...req.body, user: req.user.id });
    await newBooking.save();

    sendBookEmail(newBooking).catch((err) =>
      console.error("Email send failed:", err)
    );

    res
      .status(201)
      .json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking", error });
  }
};

const ShowBooking = async (req, res) => {
  try {
    const showdata = await Booking.find().sort({ date: -1 }).lean();
    res.status(200).json(showdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

const DeleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

const UpdateBooking = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status field is required" });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking updated successfully", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking", error });
  }
};

const history = async (req, res) => {
  try {
    const historyData = await Booking.find({ user: req.params.id })
      .sort({ date: -1 })
      .lean();

    if (!historyData || historyData.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json(historyData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching booking history", error });
  }
};

const historyBookingPDF = async (req, res) => {
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

const searchData = async (req, res) => {
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

const getStatusBooking = async (req, res) => {
  const { status } = req.query;

  try {
    if (status === "all") {
      const bookings = await Booking.find({ user: req.user.id }).lean();

      if (bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }

      return res.status(200).json(bookings);
    }

    const bookings = await Booking.find({
      $and: [{ status: status }, { user: req.user.id }],
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

const AdminStatusBooking = async (req, res) => {
  const { status } = req.query;

  try {
    if (status === "all") {
      const bookings = await Booking.find().lean();

      if (bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }
      return res.status(200).json(bookings);
    }

    const bookings = await Booking.find({ status: status }).lean();
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

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ userrole: "customer" }).lean();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const getBookingPerUser = async (req, res) => {
  try {
    const BookingPerUser = await Booking.find({ user: req.params.id }).lean();
    if (BookingPerUser.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }
    res.status(200).json(BookingPerUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user bookings", error });
  }
};

module.exports = {
  AddBooking,
  ShowBooking,
  Showbooking_Dashboard,
  UpdateBooking,
  DeleteBooking,
  bookData,
  history,
  searchData,
  historyBookingPDF,
  getStatusBooking,
  AdminStatusBooking,
  getUsers,
  getBookingPerUser,
};
