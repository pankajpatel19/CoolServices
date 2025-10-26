import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Api from "../../../Utils/axios.js";

import { Link } from "react-router-dom";

function TechnicianHeader({
  handleClick,
  handleClose,
  anchorEl,
  Technician,
  open,
  handleLogout,
}) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Hello ,
              {Technician?.userrole === "technician"
                ? Technician.userName
                : Technician?.userrole === "customer"
                ? Technician.userName
                : Technician.userName}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage complaints and service requests
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="!min-w-0 !p-3 !rounded-full !bg-gradient-to-r !from-red-500 !to-red-900 hover:!from-green-600 hover:!to-blue-600 !text-white !shadow-md hover:!shadow-lg !transition-all !duration-300"
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
            {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 font-medium flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
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
                    Logout
                  </motion.button> */}
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
              {/* <MenuItem onClick={handleClose}>
                <i className="fa-solid fa-user mr-3 text-gray-500"></i>
                <Link to="/getdata/TechProfile" state={{ Technician }}>
                  Profile
                </Link>
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                <i className="fa-solid fa-cog mr-3 text-gray-500"></i>
                <Link to="/getdata/TechProfile" state={{ Technician }}>
                  My Account
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt mr-3 text-red-500"></i>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianHeader;
