import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  appliance: {
    type: String,
    required: true, // e.g. "AC", "Washing Machine", "Fridge"
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default Service = mongoose.model("Service", serviceSchema);
