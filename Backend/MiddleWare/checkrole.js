const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role)
      return res.status(401).json({ message: "No role" });

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = checkRole;
