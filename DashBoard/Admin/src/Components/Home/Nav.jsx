import * as React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Wrench } from "lucide-react";

//MUI import
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Nav() {
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="p-3 sm:p-5 shadow-lg sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <motion.div
          className="mb-2 sm:mb-0 flex-shrink-0 flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text hidden sm:inline group-hover:from-green-500 group-hover:to-blue-500 transition-all duration-300">
            MyService
          </span>
        </motion.div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4 text-sm sm:text-base font-medium">
          {user ? (
            <div className="relative">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="!min-w-0 !p-3 !rounded-full !bg-gradient-to-r !from-green-500 !to-blue-500 hover:!from-green-600 hover:!to-blue-600 !text-white !shadow-md hover:!shadow-lg !transition-all !duration-300"
                sx={{
                  minWidth: 0,
                  padding: "12px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #10b981, #3b82f6)",
                  color: "white",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #059669, #2563eb)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <i className="fa-solid fa-user text-lg"></i>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "12px",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    minWidth: "180px",
                    marginTop: "8px",
                  },
                  "& .MuiMenuItem-root": {
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "#059669",
                    },
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-user mr-3 text-gray-500"></i>
                  <Link to={`profile/${user._id}`} className="text-gray-500">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-cog mr-3 text-gray-500"></i>
                  My account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Wrench className="w-5 h-5 text-blue mr-2 text-gray-500" />
                  <Link
                    to="/Home/addbooking"
                    className="text-gray-500"
                    state={{ user }}
                  >
                    Book Service
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-comment mr-3 text-gray-500"></i>
                  <Link to="contactUs" className="text-gray-500">
                    Contact
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-comment mr-3 text-gray-500"></i>
                  <Link to="/Home/history/upcoming" className="text-gray-500">
                    UpComing Booking
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <i className="fa-solid fa-comment mr-3 text-gray-500"></i>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-md"
                      : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:shadow-md"
                  }`
                }
              >
                <span className="relative z-10">Home</span>
                {/* {!token && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                )} */}
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-md"
                      : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:shadow-md"
                  }`
                }
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-md"
                      : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:shadow-md"
                  }`
                }
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </NavLink>

              <NavLink
                to="/contactUs"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-md"
                      : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:shadow-md"
                  }`
                }
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Nav;
