import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../Models/Admin.js";

dotenv.config();

const Murl = process.env.MONGO_URL;
mongoose.connect(Murl);

const createAdmin = async () => {
  try {
    const hashpassword = await bcrypt.hash("pankaj19", 10);
    const admin = new Admin({
      Name: "pankajpatel19",
      email: "ppankajpatel348@gmail.com",
      phone: 8511994480,
      password: hashpassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
