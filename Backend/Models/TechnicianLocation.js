const mongoose = require("mongoose");

const technicianLocationSchema = new mongoose.Schema({
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const TechnicianLocation = mongoose.model(
  "TechnicianLocation",
  technicianLocationSchema
);

module.exports = TechnicianLocation;
