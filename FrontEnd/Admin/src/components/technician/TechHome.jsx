import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import TechnicianHeader from "./TechnicianHeader";
import MainContent from "./MainContent";
import api from "../../utils/axios";

function TechHome() {
  const [booking, setbooking] = useState([]);
  const [technician, setTechnician] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const fetchBookings = useCallback(async () => {
    try {
      const response = await api.get(`/techhome/getdata`, {
        params: { username },
      });

      setbooking(response.data);
    } catch {
      toast.error("Failed to fetch bookings");
      setbooking([]);
    }
  }, [username]);

  const updatebooking = async (id, val) => {
    try {
      await api.patch(`/updatebooking/${id}`, {
        status: val,
      });
      toast.success("Updated successfully!");
      fetchBookings();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      await api.get("/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      setTechnician(null);
      toast.success("LogOut SuccessFully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setTechnician(user);
    }
    fetchBookings();
  }, [username, fetchBookings]);

  useEffect(() => {
    if (!technician?._id) return;

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          await api.post("/technician/update-location", {
            technicianId: technician._id,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        } catch (err) {
          console.error("Location update failed:", err);
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [technician]);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Done":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ToastContainer
        position="top-center"
        toastClassName="backdrop-blur-sm"
        bodyClassName="text-sm font-medium"
      />

      {/* Header Section */}
      <TechnicianHeader
        handleClose={handleClose}
        handleClick={handleClick}
        handleLogout={handleLogout}
        anchorEl={anchorEl}
        open={open}
        Technician={technician}
      />
      {/* Main Content */}
      <MainContent
        booking={booking}
        username={username}
        getStatusColor={getStatusColor}
        updatebooking={updatebooking}
      />
    </div>
  );
}

export default TechHome;
