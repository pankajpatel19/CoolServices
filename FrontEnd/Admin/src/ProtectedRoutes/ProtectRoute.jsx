import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import currentUser from "../../Utils/currentUser.js";

const ProtectRoute = ({ allowedRoles }) => {
  currentUser()
    .then((user) => {
      if (!user) {
        toast.error("You want to login first");
        return (
          <Navigate to="/login" state={{ from: location.pathname }} replace />
        );
      }

      if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
      }
    })
    .catch((err) => console.error("Error fetching user:", err));

  return <Outlet />;
};

export default ProtectRoute;
