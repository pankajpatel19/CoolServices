import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SideBar from "../../Home/SideBar";
import StateCard from "./StateCard";
import QuickAction from "./QuickAction";
import ComplainBox from "./Complaints/ComplainBox";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
        className=" flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4"
      >
        {/* <SideBar /> */}
        <div className="max-w-4xl mx-auto">
          {/* Main Welcome Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">CS</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Welcome,
                  {User?.userrole === "technician"
                    ? User.userName
                    : User?.userrole === "customer"
                    ? User.userName
                    : User?.userrole === "user"
                    ? User.userName
                    : "guest"}
                  ! 👋
                </h1>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-6">
              Thanks for logging in to{" "}
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
                Cool Service Store
              </span>
              . What do you want to book today?
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/Home/addbooking")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book a Service
              </button>

              <Link
                to={`/Home/history/${User._id}`}
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 group border hover:border-gray-300"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View History
              </Link>
            </div>
          </motion.div>

          {/* Complaints form */}
          <ComplainBox />

          <StateCard />

          {/* Quick Actions */}
          {/* <QuickAction /> */}
        </div>
      </motion.div>
    </div>
  );
}

export default UserHome;
