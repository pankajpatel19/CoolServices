import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";
import Admin from "../Models/Admin.model.js";

const userAuth = async (req, res, next) => {
  let token;
  let user;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not Authorized! Login again" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

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

export default userAuth;
