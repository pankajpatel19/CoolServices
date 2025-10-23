import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TechnicianHeader from "./TechnicianHeader";
import MainContent from "./MainContent";

function TechHome() {
  const [booking, setbooking] = useState([]);
  const [Technician, setTechnician] = useState("");
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

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1916/api/techhome/getdata`,
        {
          params: { username },
        }
      );

      setbooking(response.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
      setbooking([]);
    }
  };

  const updatebooking = async (id, val) => {
    try {
      await axios.patch(
        `https://coolservices.onrender.com/updatebooking/${id}`,
        {
          status: val,
        }
      );
      toast.success("Updated successfully!");
      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:1916/logout", { withCredentials: true });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("LogOut SuccessFully");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const technician = JSON.parse(localStorage.getItem("user"));

    if (technician) {
      setTechnician(technician);
    }
    fetchBookings();
  }, [username]);

  useEffect(() => {
    if (!Technician?._id) {
      console.log("not found");
    }
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        fetch("http://localhost:1916/api/technician/update-location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            technicianId: Technician._id,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        });
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [Technician]);

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
        Technician={Technician}
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
