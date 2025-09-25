import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    toast.error("You want to login first");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectRoute;
