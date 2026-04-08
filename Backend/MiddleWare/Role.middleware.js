const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Authorized roles: ${roles.join(", ")}`,
      });
    }
    next();
  };
};

export default checkRole;
