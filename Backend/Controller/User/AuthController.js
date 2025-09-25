// require("dotenv").config();

const User = require("../../Models/User.js");
const Admin = require("../../Models/Admin.js");
const bcrypt = require("bcrypt");
//jwt cookie
const jwt = require("jsonwebtoken");
const { SignUpEmail } = require("../../utils/Sendmails.js");

const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    let role;

    if (user) {
      role = user.userrole;
    } else {
      user = await Admin.findOne({ email: email });
      if (user) {
        role = "admin";
      }
    }

    if (!user) {
      res.status(404).json({ message: "User Not found" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "password incorrect" });
    }
    //token
    let token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    //-----------
    res.json({ message: "login successfully", user, token, role });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  let { username, email, password, userrole } = req.body;

  try {
    const find = await User.findOne({ email: email });

    if (find) {
      return res.status(401).json({ message: "User Already Exists!!!" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName: username,
      email: email,
      password: hashpassword,
      userrole: userrole,
    });

    await user.save();
    try {
      await SignUpEmail(user);
    } catch (err) {
      console.log(err);
    }
    //token
    let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      // process.env.NODE_ENV === "production",
      sameSite: "Lax",
      // process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.json({ message: "Register SuccesFully", user });
  } catch (error) {
    res.json({ message: error });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.json({ message: "Logged out successfully" });
};

const updateProfile = async (req, res) => {
  const { userName, email, phone, location } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?.id,
    {
      $set: {
        userName: userName,
        email: email,
        phone: phone,
        address: location,
      },
    },
    { new: true }
  );
  res.json({ message: "user Updated SuccessFully", user });
};

const fetchUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json({ message: "user profile fetch", user });
};

module.exports = { login, signup, logout, updateProfile, fetchUser };
