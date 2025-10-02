import { motion } from "framer-motion";
function HeaderDash({
  showDashboard,
  handleLogout,
  showTechnician,
  showTechnicianLocation,
}) {
  return (
    <div>
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Service Dashboard
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                Manage complaints and service requests
              </p>
            </div>

            <div className="flex gap-1 sm:gap-2 md:gap-3">
              <button
                onClick={showDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-md transition-all duration-200 font-medium flex items-center gap-1 sm:gap-2"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                <span className="text-xs sm:text-sm md:text-base">
                  Dashboard
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-md transition-all duration-200 font-medium flex items-center gap-1 sm:gap-2"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                <span className="text-xs sm:text-sm md:text-base">Logout</span>
              </button>

              <button
                onClick={showTechnician}
                className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-md transition-all duration-200 font-medium flex items-center gap-1 sm:gap-2"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                <span className="text-xs sm:text-sm md:text-base">
                  Technician
                </span>
              </button>
              <button
                onClick={showTechnicianLocation}
                className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-md transition-all duration-200 font-medium flex items-center gap-1 sm:gap-2"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                <span className="text-xs sm:text-sm md:text-base">
                  Technician Location
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDash;
