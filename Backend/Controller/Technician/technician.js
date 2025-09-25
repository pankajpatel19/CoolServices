// require("dotenv").config();

const Booking = require("../../Models/Booking");

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

module.exports = { techniciandata };
