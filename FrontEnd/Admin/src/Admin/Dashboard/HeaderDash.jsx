import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import api from "../../../Utils/axios.js";
import { FanIcon, ShowerHead } from "lucide-react";

const IconHome = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6-4a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const IconDashboard = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const IconTechnician = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const IconUsers = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6m6 3v-1a6 6 0 00-6-6h-1.5m-4.5 0A3.978 3.978 0 0112 15.121a3.978 3.978 0 01-3.5 0M12 4.354v5.292"
    />
  </svg>
);

const IconLocation = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const IconLogout = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

function HeaderDash() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await api.get("/logout", {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("LogOut SuccessFully");
    navigate("/login");
    window.location.reload();
  };

  const navigateAndClose = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      label: "Home",
      handler: () => navigateAndClose("/admin/showbooking"),
      icon: <IconHome />,
      style: "bg-zinc-600 hover:bg-zinc-700",
    },
    {
      label: "Dashboard",
      handler: () => navigateAndClose("/admin/dashboard"),
      icon: <IconDashboard />,
      style: "bg-blue-600 hover:bg-blue-700",
    },
    {
      label: "Technician",
      handler: () => navigateAndClose("/admin/handleTechnician"),
      icon: <IconTechnician />,
      style: "bg-green-600 hover:bg-green-700",
    },
    {
      label: "Users",
      handler: () => navigateAndClose("/admin/handleUser"),
      icon: <IconUsers />,
      style: "bg-zinc-600 hover:bg-zinc-700",
    },
    {
      label: "Location",
      handler: () => navigateAndClose("/admin/TechLocations"),
      icon: <IconLocation />,
      style: "bg-purple-600 hover:bg-purple-700",
    },
    {
      label: "Add Service",
      handler: () => navigateAndClose("/admin/addService"),
      icon: <FanIcon />,
      style: "bg-yellow-600 hover:bg-orange-700",
    },
    {
      label: "Show Service",
      handler: () => navigateAndClose("/admin/showService"),
      icon: <ShowerHead />,
      style: "bg-yellow-600 hover:bg-orange-700",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.15 },
    },
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Service Dashboard
            </h1>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Main menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  variants={popupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={item.handler}
                        className={`w-full text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 font-medium flex items-center gap-3 text-left ${item.style}`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}

                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 font-medium flex items-center gap-3 text-left"
                    >
                      <IconLogout />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </nav>
  );
}

export default HeaderDash;
