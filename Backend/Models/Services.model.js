import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    appliance: {
      type: String,
      required: true, // e.g. "AC", "Refrigerator"
    },
    name: {
      type: String,
      required: true, // e.g. "Jet Service"
    },
    description: {
      type: String,
      required: true, // e.g. "Deep jet cleaning with high-pressure water jet."
    },
    duration: {
      type: String, // e.g. "1 hour", "45 mins"
    },
    price: {
      type: Number,
      required: true,
    },
    serviceType: {
      type: String, // e.g. "Dry", "Water", "Chemical", etc.
    },
    imageUrl: {
      type: String, // Thumbnail or banner image of the service
    },
    videoUrl: {
      type: String, // Service explanation video
    },
    toolsUsed: {
      type: [String], // e.g. ["Jet Pump", "Brush", "Chemical Foam"]
    },
    includedItems: {
      type: [String], // e.g. ["Filter Cleaning", "Gas Check", "Compressor Test"]
    },
    rating: {
      type: Number,
      default: 4.5, // Average rating
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
