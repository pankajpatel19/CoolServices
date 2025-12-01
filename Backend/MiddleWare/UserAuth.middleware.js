import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer ")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  // console.log(token);

  if (!accessToken) {
    return res.status(401).json({ message: "Not Authorized! Login again" });
  }

  try {
    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);

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
