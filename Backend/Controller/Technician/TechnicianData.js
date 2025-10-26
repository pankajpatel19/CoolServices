const TechnicianLocation = require("../../Models/TechnicianLocation");
const User = require("../../Models/User");
const Booking = require("../../Models/Booking");
const { TechReminder } = require("../../utils/Sendmails");

const handleTech = async (req, res) => {
  try {
    const technician = await User.find({ userrole: "technician" });

    res.json(technician);
  } catch (error) {
    res.status(401).json({ message: "SOmething Went Wrong" });
  }
};

const deleteTech = async (req, res) => {
  try {
    const deletetechnician = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Technician Deleted SuccessFully" });
  } catch (error) {
    res.status(401).json({ message: "Something Went Wrong" });
  }
};

const UpdateTechnician = async (req, res) => {
  let id = req.params.id;

  const updatebook = await Booking.findByIdAndUpdate(id, {
    technician: req.body.technician,
  });

  TechReminder(updatebook);
  res.json(updatebook);
};

const updateLocation = async (req, res) => {
  const { technicianId, latitude, longitude } = req.body;

  if (!technicianId || !latitude || !longitude) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const location = await TechnicianLocation.findOneAndUpdate(
    { technicianId },
    { latitude, longitude, updatedAt: Date.now() },
    { upsert: true, new: true }
  );

  res.json({ success: true, location });
};

const getAllLocations = async (req, res) => {
  const locations = await TechnicianLocation.find().populate(
    "technicianId",
    "phone userName"
  );

  res.json(locations);
};

module.exports = {
  handleTech,
  deleteTech,
  UpdateTechnician,
  updateLocation,
  getAllLocations,
};
