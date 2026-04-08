import { ApiResponse } from "../utils/ApiResponse.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${req.method} ${req.url}:`, err);

  res.status(statusCode).json(
    new ApiResponse(statusCode, null, message)
  );
};

export default errorMiddleware;
