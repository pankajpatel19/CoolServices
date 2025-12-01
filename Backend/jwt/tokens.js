import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {};

export const verifyRefreshToken = (token) => {
  try {
    if (!token) {
      return { message: "token Not found" };
    }

    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    console.log("error while verfiy refToken", error);
  }
};
