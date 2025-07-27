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
    try {
      axios
        .get("https://coolservices.onrender.com/showbooking/dashboard")
        .then((res) => {
          setDashData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-zinc-700">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-sm text-zinc-600">Total Bookings</p>
          <h3 className="text-xl font-semibold">{DashData.total || 0}</h3>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-sm text-zinc-600">New Bookings</p>
          <h3 className="text-xl font-semibold">{DashData.newBooking || 0}</h3>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm text-zinc-600">In Progress Bookings</p>
          <h3 className="text-xl font-semibold">{DashData.inProgress || 0}</h3>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm text-zinc-600">Completed Bookings</p>
          <h3 className="text-xl font-semibold">{DashData.Done || 0}</h3>
        </div>
      </div>
      <div className="bg-white p-4 mt-8 rounded shadow w-full">
        <h3 className="text-lg font-semibold mb-4">Booking Status Chart</h3>
        <ResponsiveContainer width="50%" height={300}>
          <BarChart
            data={[
              { name: "New", count: DashData.New || 0 },
              { name: "Pending", count: DashData.InProgress || 0 },
              { name: "Completed", count: DashData.Done || 0 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default Data;
