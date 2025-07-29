import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function Data() {
  const [DashData, setDashData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "https://coolservices.onrender.com/showbooking/dashboard"
        );
        console.log(res.data);
        setDashData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = [
    { name: "New", count: DashData.newBooking || 0 },
    { name: "In Progress", count: DashData.InProgress || 0 },
    { name: "Done", count: DashData.Done || 0 },
  ];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-zinc-700">Admin Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow-md text-center">
          <p className="text-sm text-zinc-600">Total Bookings</p>
          <h3 className="text-2xl font-semibold">{DashData.total || 0}</h3>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow-md text-center">
          <p className="text-sm text-zinc-600">New Bookings</p>
          <h3 className="text-2xl font-semibold">{DashData.newBooking || 0}</h3>
        </div>

        <div className="bg-orange-100 p-4 rounded shadow-md text-center">
          <p className="text-sm text-zinc-600">In Progress</p>
          <h3 className="text-2xl font-semibold">{DashData.InProgress || 0}</h3>
        </div>

        <div className="bg-green-100 p-4 rounded shadow-md text-center">
          <p className="text-sm text-zinc-600">Completed</p>
          <h3 className="text-2xl font-semibold">{DashData.Done || 0}</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 mt-10 rounded shadow-md w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Booking Status Chart
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default Data;
