import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const userAuth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json(
        new ApiResponse(401, null, "Authentication required. Please log in."),
      );
  }

  try {
    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (decode?.id) {
      req.user = decode;
      next();
    } else {
      return res
        .status(401)
        .json(
          new ApiResponse(401, null, "Invalid session. Please log in again."),
        );
    }
  } catch (error) {
    console.error("[AuthMiddleware] Error:", error.message);
    const message =
      error.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Invalid token.";
    return res.status(401).json(new ApiResponse(401, null, message));
  }
};

export default userAuth;
