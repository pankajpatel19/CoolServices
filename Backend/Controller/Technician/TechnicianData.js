const TechnicianLocation = require("../../Models/TechnicianLocation");
const User = require("../../Models/User");
const Booking = require("../../Models/Booking");
const { TechReminder } = require("../../utils/Sendmails");

const handleTech = async (req, res) => {
  try {
    const technicians = await User.find({ userrole: "technician" }).lean();

    if (!technicians || technicians.length === 0) {
      return res.status(404).json({ message: "No technicians found" });
    }

    res.status(200).json(technicians);
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ message: "Error fetching technicians", error });
  }
};

const deleteTech = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json({ message: "Technician deleted successfully" });
  } catch (error) {
    console.error("Error deleting technician:", error);
    res.status(500).json({ message: "Error deleting technician", error });
  }
};

const UpdateTechnician = async (req, res) => {
  try {
    const id = req.params.id;
    const { technician } = req.body;

    if (!technician) {
      return res.status(400).json({ message: "Technician field is required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { technician },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    TechReminder(updatedBooking).catch((err) =>
      console.error("TechReminder failed:", err)
    );

    res.status(200).json({
      message: "Technician assigned successfully",
      updatedBooking,
    });
  } catch (error) {
    console.error("Error updating technician:", error);
    res.status(500).json({ message: "Error updating technician", error });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { technicianId, latitude, longitude } = req.body;

    if (!technicianId || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const location = await TechnicianLocation.findOneAndUpdate(
      { technicianId },
      { latitude, longitude, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Technician location updated successfully",
      location,
    });
  } catch (error) {
    console.error("Error updating technician location:", error);
    res.status(500).json({ message: "Error updating location", error });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await TechnicianLocation.find()
      .populate("technicianId", "phone userName")
      .lean();

    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: "No technician locations found" });
    }

    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching technician locations:", error);
    res.status(500).json({ message: "Error fetching locations", error });
  }
};

module.exports = {
  handleTech,
  deleteTech,
  UpdateTechnician,
  updateLocation,
  getAllLocations,
};
