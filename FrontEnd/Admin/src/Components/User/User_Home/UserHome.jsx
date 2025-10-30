import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StateCard from "./StateCard";
import ComplainBox from "./Complaints/ComplainBox";
import { User2 } from "lucide-react";

function UserHome() {
  const [User, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
        className="relative flex min-h-screen p-6 sm:p-8"
      >
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 sm:p-10 mb-8 overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 rounded-3xl pointer-events-none"></div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="relative text-white text-2xl font-bold tracking-tight">
                    <div className="w-16 h-16 mt-5 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          User.avatar === "undefined" ? (
                            <User2 className="w-1 h-2 " />
                          ) : (
                            User.avatar
                          )
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </span>
                </motion.div>
                <div>
                  <motion.h1
                    className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent leading-tight"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Welcome Back,
                  </motion.h1>
                  <motion.div
                    className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-2 mt-1"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {User?.userrole === "technician"
                      ? User.userName
                      : User?.userrole === "customer"
                      ? User.userName
                      : User?.userrole === "user"
                      ? User.userName
                      : "Guest"}
                    <span className="text-4xl">👋</span>
                  </motion.div>
                </div>
              </div>

              <motion.p
                className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Ready to get started? Choose from our premium services at{" "}
                <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text px-2 py-1 rounded-lg bg-blue-50/50">
                  Cool Service Store
                </span>{" "}
                today!
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <button
                  onClick={() => navigate("/Home/addbooking")}
                  className="relative flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <svg
                    className="relative w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="relative">Book a Service</span>

                  <svg
                    className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <Link
                  to={`/Home/history/${User._id}`}
                  className="relative flex-1 bg-white text-gray-800 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 group border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <svg
                    className="relative w-6 h-6 group-hover:scale-110 transition-transform duration-300 text-gray-600 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="relative group-hover:text-blue-700 transition-colors duration-300">
                    View History
                  </span>

                  <svg
                    className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-gray-600 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  to="/Home/Services"
                  className="relative flex-1 bg-white text-gray-800 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 group border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <svg
                    className="relative w-6 h-6 group-hover:scale-110 transition-transform duration-300 text-gray-600 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="relative group-hover:text-blue-700 transition-colors duration-300">
                    Services We Provide
                  </span>

                  <svg
                    className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-gray-600 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-3 gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Support</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    Fast
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Service</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Quality</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <ComplainBox />
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <StateCard />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserHome;
