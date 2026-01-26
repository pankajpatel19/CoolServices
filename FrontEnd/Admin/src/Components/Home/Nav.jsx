import * as React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import {
  Wrench,
  Menu as MenuIcon,
  X,
  MessageSquareWarning,
  User,
  Home,
  CalendarDays,
  Phone,
  LogOut,
  UserPlus,
  LogIn,
  Cog,
} from "lucide-react";

//MUI import
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import api from "../../../Utils/axios.js";
import currentUser from "../../../Utils/currentUser.js";

function Nav() {
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await api.get("/logout", {
      withCredentials: true,
    });
    toast.success("LogOut SuccessFully");
    navigate("/login");
  };

  useEffect(() => {
    currentUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
                className="relative w-10 h-10 rounded-full shadow-lg ring-2 ring-white group-hover:ring-4 transition-all duration-300"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline-block tracking-tight">
              Cool Services
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
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
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #059669 0%, #2563eb 50%, #7c3aed 100%)",
                      boxShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.5)",
                    },
                  }}
                >
                  <i className="fa-solid fa-user text-base"></i>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
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
                      "&:hover": {
                        backgroundColor: "rgba(16, 185, 129, 0.08)",
                        color: "#059669",
                      },
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <User className="w-5 h-5 mr-3 text-gray-600" />
                    {user?.id && <Link to={`profile/${user.id}`}>Profile</Link>}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Home className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to={`/Home`}>Home</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Wrench className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/Home/addbooking">Book Service</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Cog className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/Home/Services">Services We Provide</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <MessageSquareWarning className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to={`/Home/complain/${user.id}`}>Complaints</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Phone className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/contactUs">Contact</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <CalendarDays className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/Home/history/upcoming">Upcoming Bookings</Link>
                  </MenuItem>
                  <div className="border-t border-gray-200 my-2 mx-2"></div>
                  <MenuItem onClick={handleLogout}>
                    <LogOut className="w-5 h-5 mr-3 text-gray-600" />
                    <span className="text-red-500 font-semibold">Logout</span>
                  </MenuItem>
                </Menu>
              </motion.div>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                      isActive
                        ? "text-white shadow-lg shadow-green-500/30"
                        : "text-gray-700 hover:text-white hover:shadow-lg"
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
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                      isActive
                        ? "text-white shadow-lg shadow-green-500/30"
                        : "text-gray-700 hover:text-white hover:shadow-lg"
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
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                      isActive
                        ? "text-white shadow-lg shadow-green-500/30"
                        : "text-gray-700 hover:text-white hover:shadow-lg"
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
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/contactUs"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                      isActive
                        ? "text-white shadow-lg shadow-green-500/30"
                        : "text-gray-700 hover:text-white hover:shadow-lg"
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
                    </>
                  )}
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {!mobileMenuOpen ? (
                <MenuIcon className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                {user?._id && (
                  <Link
                    to={`profile/${user._id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block flex px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium"
                  >
                    {" "}
                    <User className="w-5 h-5 mr-3 text-gray-600" />
                    Profile
                  </Link>
                )}

                <Link
                  to="/Home/addbooking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium"
                >
                  <Wrench className="w-5 h-5 inline mr-3" />
                  Book Service
                </Link>

                <Link
                  to="/Home/Services"
                  className="flex px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Cog className="w-5 h-5 mr-3 text-gray-600" />
                  Services We Provide
                </Link>
                <Link
                  to={`/Home/complain/${user.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium"
                >
                  <MessageSquareWarning className="w-5 h-5 inline mr-3" />
                  Complaints
                </Link>
                <Link
                  to="contactUs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium"
                >
                  <Phone className="w-5 h-5 mr-3 text-gray-600" />
                  Contact
                </Link>
                <Link
                  to="/Home/history/upcoming"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium"
                >
                  <CalendarDays className="w-5 h-5 mr-3 text-gray-600" />
                  Upcoming Bookings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 font-semibold"
                >
                  <LogOut className="w-5 h-5 mr-3 text-red-600" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-lg font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  <Home className="w-5 h-5 mr-3 text-gray-600" />
                  Home
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-lg font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  <UserPlus className="w-5 h-5 mr-3 text-gray-600" />
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-lg font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  <LogIn className="w-5 h-5 mr-3 text-gray-600" />
                  Login
                </NavLink>
                <NavLink
                  to="/contactUs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-lg font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  <Phone className="w-5 h-5 mr-3 text-gray-600" />
                  Contact Us
                </NavLink>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Nav;
