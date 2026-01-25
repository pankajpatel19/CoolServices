import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      maxPoolSize: 10,
      minPoolSize: 3,
      socketTimeoutMS: 30000,
      waitQueueTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
