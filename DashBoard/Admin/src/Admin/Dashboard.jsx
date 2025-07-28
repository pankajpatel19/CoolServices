import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [booking, setbooking] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "https://coolservices.onrender.com/showbooking"
      );
      setbooking(response.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
      setbooking([]);
    }
  };

  const handledelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirm) return;
    try {
      await axios.delete(
        `https://coolservices.onrender.com/deletebooking/${id}`
      );
      toast.success("Deleted successfully!");
      setTimeout(() => fetchBookings(), 500); // ✅ fixed here
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updatebooking = async (id, val) => {
    try {
      await axios.patch(
        `https://coolservices.onrender.com/updatebooking/${id}`,
        {
          status: val,
        }
      );
      toast.success("Updated successfully!");
      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => navigate("/");
  const showDashboard = () => navigate("/dashboard");

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex justify-center mt-6 px-4 sm:px-6">
      <ToastContainer position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        className="w-full max-w-7xl"
      >
        {/* Top Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={handleLogout}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md transition"
          >
            Logout
          </button>
          <button
            onClick={showDashboard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition"
          >
            Dashboard
          </button>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-serif font-semibold text-center mb-6 text-gray-800">
          Complaints
        </h1>

        {/* Table Section */}
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full text-center border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="text-sm sm:text-base">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Appliance</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-3 py-2">{item.name}</td>
                  <td className="border px-3 py-2">{item.appliance}</td>
                  <td className="border px-3 py-2">{item.company}</td>
                  <td className="border px-3 py-2">{item.date}</td>
                  <td className="border px-3 py-2">{item.phone}</td>
                  <td className="border px-3 py-2">{item.time}</td>
                  <td className="border px-3 py-2">
                    <select
                      className="border rounded px-2 py-1 bg-white focus:outline-none text-sm"
                      value={item.status}
                      onChange={(e) => updatebooking(item._id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td className="p-1 border">
                    <button
                      className="w-full sm:w-24 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition"
                      onClick={() => handledelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
