import { ApiResponse } from "../utils/ApiResponse.js";

const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.userrole)) {
      return res.status(403).json(
        new ApiResponse(403, null, `Access denied. Requires one of the following roles: ${roles.join(", ")}`)
      );
    }
    next();
  };
};

export default checkRole;
