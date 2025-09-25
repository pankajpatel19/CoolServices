const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const userAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not Authorized ! login again" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);

    if (decode?.id) {
      req.user = decode;
      next();
    } else {
      return res.status(401).json({ message: "Login Again" });
    }
  } catch (error) {
    return res.status(401).json({ message: error.message || "Invalid token" });
  }
};

module.exports = userAuth;
