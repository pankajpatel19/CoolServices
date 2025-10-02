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
  const navigate = useNavigate();

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
      className="px-4 py-4 sm:px-6 sm:py-5 sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4 sm:gap-0">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <img
              src={logo}
              alt="Logo"
              className="relative w-11 h-11 rounded-full shadow-lg ring-2 ring-white group-hover:ring-4 transition-all duration-300"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline-block tracking-tight group-hover:from-green-500 group-hover:via-blue-500 group-hover:to-purple-500 transition-all duration-300">
            MyService
          </span>
        </motion.div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-sm sm:text-base">
          {user ? (
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  minWidth: 0,
                  padding: "10px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
                  color: "white",
                  boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #2563eb 50%, #7c3aed 100%)",
                    boxShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.5)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transition: "left 0.5s",
                  },
                  "&:hover::before": {
                    left: "100%",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <i className="fa-solid fa-user text-base"></i>
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
                    borderRadius: "16px",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    border: "1px solid rgba(229, 231, 235, 0.8)",
                    minWidth: "220px",
                    marginTop: "12px",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                  },
                  "& .MuiMenuItem-root": {
                    padding: "14px 20px",
                    fontSize: "14px",
                    fontWeight: 500,
                    borderRadius: "8px",
                    margin: "4px 8px",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: "rgba(16, 185, 129, 0.08)",
                      color: "#059669",
                      transform: "translateX(4px)",
                    },
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-user mr-3 text-gray-600 w-5"></i>
                  <Link
                    to={`profile/${user._id}`}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-cog mr-3 text-gray-600 w-5"></i>
                  <span className="text-gray-700 hover:text-gray-900 transition-colors">
                    My account
                  </span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Wrench className="w-5 h-5 mr-3 text-gray-600" />
                  <Link
                    to="/Home/addbooking"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    state={{ user }}
                  >
                    Book Service
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-comment mr-3 text-gray-600 w-5"></i>
                  <Link
                    to="contactUs"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Contact
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <i className="fa-solid fa-calendar-check mr-3 text-gray-600 w-5"></i>
                  <Link
                    to="/Home/history/upcoming"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Upcoming Bookings
                  </Link>
                </MenuItem>
                <div className="border-t border-gray-200 my-2 mx-2"></div>
                <MenuItem onClick={handleLogout}>
                  <i className="fa-solid fa-sign-out-alt mr-3 text-red-500 w-5"></i>
                  <span className="text-red-500 font-semibold">Logout</span>
                </MenuItem>
              </Menu>
            </motion.div>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-white shadow-lg shadow-green-500/30"
                      : "text-gray-700 hover:text-white hover:shadow-lg hover:shadow-green-500/20"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">Home</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-white shadow-lg shadow-green-500/30"
                      : "text-gray-700 hover:text-white hover:shadow-lg hover:shadow-green-500/20"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">Sign Up</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-white shadow-lg shadow-green-500/30"
                      : "text-gray-700 hover:text-white hover:shadow-lg hover:shadow-green-500/20"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">Login</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/contactUs"
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-white shadow-lg shadow-green-500/30"
                      : "text-gray-700 hover:text-white hover:shadow-lg hover:shadow-green-500/20"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">Contact Us</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </>
                )}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Nav;
