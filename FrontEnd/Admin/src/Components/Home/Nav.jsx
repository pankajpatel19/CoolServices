import * as React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  ShieldCheck,
} from "lucide-react";

//MUI import
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import api from "../../utils/axios.js";

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
    try {
      await api.get("/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setMobileMenuOpen(false);
      toast.success("LogOut SuccessFully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    try {
      const storedItem = localStorage.getItem("user");
      if (storedItem) {
        const currentUser = JSON.parse(storedItem);
        if (currentUser && currentUser.user) {
          setUser(currentUser.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      setUser(null);
      localStorage.removeItem("user");
    }
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
                    {(user?._id || user?.id) && (
                      <Link to={`/home/profile/${user._id || user.id}`}>
                        Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Home className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to={`/home`}>Home</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Wrench className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/home/addbooking">Book Service</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Cog className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/home/services">Services We Provide</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <MessageSquareWarning className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to={`/home/complain/${user.id}`}>Complaints</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Phone className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/contactUs">Contact</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <CalendarDays className="w-5 h-5 mr-3 text-gray-600" />
                    <Link to="/home/history/upcoming">Upcoming Bookings</Link>
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {user ? (
                <>
                  <Link
                    to={
                      user?._id || user?.id
                        ? `/home/profile/${user._id || user.id}`
                        : "#"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <User className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                    <span className="font-semibold">Profile</span>
                  </Link>

                  <Link
                    to="/home/addbooking"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <Wrench className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                    <span className="font-semibold">Book Service</span>
                  </Link>

                  <Link
                    to="/home/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <Cog className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                    <span className="font-semibold">Our Services</span>
                  </Link>

                  <Link
                    to={
                      user?._id || user?.id
                        ? `/home/complain/${user._id || user.id}`
                        : "#"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <MessageSquareWarning className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                    <span className="font-semibold">Complaints</span>
                  </Link>

                  <Link
                    to="/contactUs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <Phone className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                    <span className="font-semibold">Contact</span>
                  </Link>

                  <Link
                    to="/home/history/upcoming"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <CalendarDays className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                    <span className="font-semibold">Upcoming</span>
                  </Link>

                  <div className="h-px bg-gray-100 mx-4 my-2"></div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 group"
                  >
                    <LogOut className="w-5 h-5 mr-3 text-red-400 group-hover:text-red-600" />
                    <span className="font-bold">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <Home className="w-5 h-5 mr-3" />
                    Home
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <UserPlus className="w-5 h-5 mr-3" />
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    Login
                  </NavLink>
                  <NavLink
                    to="/contactUs"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Contact Us
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Nav;
