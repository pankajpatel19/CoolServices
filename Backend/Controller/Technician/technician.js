// require("dotenv").config();

const Booking = require("../../Models/Booking");
const User = require("../../Models/User");

const techniciandata = async (req, res) => {
  const { username } = req.query;

  try {
    const techdata = await Booking.find({ technician: username });

    if (!techdata || techdata.length == 0) {
      return res.json({ message: "data Not found" });
    }

    res.json(techdata);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getTechnician = async (req, res) => {
  try {
    const tech = await User.findById(req.user.id);

    return res.json({
      message: "fetching Details successFully",
      tech,
    });
  } catch (error) {
    return res.json({ message: "Error while fetching Details" });
  }
};

const TechStatusBooking = async (req, res) => {
  const { status } = req.query;
  // console.log(status);

  try {
    const bookings = await Booking.find({ status: status });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "Booking Not Found with Status" });
    }

    res.status(200).json({ message: "Fetched Succcessfully", bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = { techniciandata, getTechnician, TechStatusBooking };
