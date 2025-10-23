// require("dotenv").config();

const User = require("../../Models/User.js");
const Admin = require("../../Models/Admin.js");
const bcrypt = require("bcrypt");
//jwt cookie
const jwt = require("jsonwebtoken");
const { SignUpEmail } = require("../../utils/Sendmails.js");
const {
  userRegistrationSchema,
  loginRegisterSchema,
} = require("../../MiddleWare/Joi.js");
const { uploadFile } = require("../../utils/cloudinary.js");
const Booking = require("../../Models/Booking.js");

const login = async (req, res) => {
  const { error, value } = loginRegisterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let { email, password } = value;

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
  const { error, value } = userRegistrationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let { userName, email, password, userrole } = value;

  try {
    const find = await User.findOne({ email: email });

    if (find) {
      return res.status(401).json({ message: "User Already Exists!!!" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName: userName,
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
      sameSite: "Lax",
    });
    res.json({ message: "Register SuccesFully", user });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: error.details[0].message });
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

const updateImagePro = async (req, res) => {
  try {
    let avatar = null;

    if (req.file) {
      const cloudres = await uploadFile(req.file.path);
      avatar = cloudres?.secure_url;
    }

    if (!avatar) {
      return res.json({ message: "Image Uplod failed" });
    }

    const updateimge = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          avatar: avatar,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "avatar Image Uplod successFully", user: updateimge });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "SomeThing Went Wrong" });
  }
};

module.exports = {
  login,
  signup,
  logout,
  updateProfile,
  fetchUser,
  updateImagePro,
};
