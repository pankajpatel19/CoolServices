require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");

const Murl = process.env.MONGO_URL;
mongoose.connect(Murl);

const createAdmin = async () => {
  try {
    const hashpassword = await bcrypt.hash("pankaj19", 10);
    const admin = new Admin({
      Name: "pankajpatel19",
      email: "ppankajpatel348@gmail.com",
      password: hashpassword,
    });

    await admin.save();
    console.log("admin created");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
