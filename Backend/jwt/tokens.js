import jwt from "jsonwebtoken";

/**
 * Generates both Access and Refresh tokens for a user.
 * @param {Object} user - The user object from database.
 * @returns {Object} - Object containing accessToken and refreshToken.
 */
export const generateToken = (user) => {
  const payload = { 
    id: user._id, 
    role: user.userrole || "user" 
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

/**
 * Verifies an Access Token.
 * @param {string} token - The access token to verify.
 * @returns {Object} - The decoded payload.
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

/**
 * Verifies a Refresh Token.
 * @param {string} token - The refresh token to verify.
 * @returns {Object} - The decoded payload.
 */
export const verifyRefreshToken = (token) => {
  try {
    if (!token) {
      throw new Error("Refresh token not provided");
    }
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    console.error("[TokenService] Refresh token verification failed:", error.message);
    throw error;
  }
};
