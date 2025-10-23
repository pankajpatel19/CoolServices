const Booking = require("../../Models/Booking");
const generateBookingPDF = require("../../utils/generateBookingPDF");
const { sendBookEmail } = require("../../utils/Sendmails");

const Showbooking_Dashboard = async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const newBooking = await Booking.countDocuments({ status: "New" });
    const InProgress = await Booking.countDocuments({ status: "In Progress" });
    const Done = await Booking.countDocuments({ status: "Done" });

    res.json({ total, newBooking, InProgress, Done });
  } catch (error) {
    res.json({ message: "No Bookings" });
  }
};
//show perticuler id data

const bookData = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(401).json({ message: "Booking Not Found" });
    }
    res.json(booking);
  } catch (error) {
    res.json({ message: error });
  }
};

const AddBooking = async (req, res) => {
  const newBooking = new Booking({ ...req.body, user: req.user.id });
  await newBooking.save();
  await sendBookEmail(newBooking);
  res.json({ message: "Booking Successfully", newBooking });
};

const ShowBooking = async (req, res) => {
  const showdata = await Booking.find().sort({ date: -1 });

  res.json(showdata);
};

const DeleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deletebook = await Booking.findByIdAndDelete(id);
    if (!deletebook) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

const UpdateBooking = async (req, res) => {
  let id = req.params.id;

  const updatebook = await Booking.findByIdAndUpdate(id, {
    status: req.body.status,
  });
  res.json(updatebook);
};

const history = async (req, res) => {
  const { id } = req.params;

  try {
    const historyData = await Booking.find({ user: id }).sort({ date: -1 });

    if (!historyData) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(historyData);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const historyBookingPDF = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  generateBookingPDF(booking, res);
};

const searchData = async (req, res) => {
  const { startDate, endDate } = req.query;

  const filter = await Booking.find({
    issueDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  });

  res.json(filter);
};
const getStatusBooking = async (req, res) => {
  const { status } = req.query;

  try {
    if (status === "all") {
      const bookings = await Booking.find({ user: req.user.id });

      if (bookings.length === 0) {
        return res
          .status(404)
          .json({ message: "Booking Not Found with Status" });
      }

      return res
        .status(200)
        .json({ message: "Fetched Succcessfully", bookings });
    } else {
      const bookings = await Booking.find({
        $and: [{ status: status }, { user: req.user.id }],
      });

      if (bookings.length === 0) {
        return res
          .status(404)
          .json({ message: "Booking Not Found with Status" });
      }

      return res
        .status(200)
        .json({ message: "Fetched Succcessfully", bookings });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const AdminStatusBooking = async (req, res) => {
  const { status } = req.query;

  try {
    if (status === "all") {
      const bookings = await Booking.find();

      if (bookings.length === 0) {
        return res
          .status(404)
          .json({ message: "Booking Not Found with Status" });
      }

      return res
        .status(200)
        .json({ message: "Fetched Succcessfully", bookings });
    } else {
      const bookings = await Booking.find({ status: status });

      if (bookings.length === 0) {
        return res
          .status(404)
          .json({ message: "Booking Not Found with Status" });
      }

      res.status(200).json({ message: "Fetched Succcessfully", bookings });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something Went Wrong" });
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
};
