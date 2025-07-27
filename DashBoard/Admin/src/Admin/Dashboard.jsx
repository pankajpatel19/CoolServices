import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Done from "../Admin/Data";
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
      "Are you Sure ,,,want to delete this booking"
    );
    if (!confirm) {
      return;
    }
    try {
      await axios.delete(
        `https://coolservices.onrender.com/deletebooking/${id}`
      );
      toast.success("Deleted successfully!");
      setTimeout(fetchBookings(), 500);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const updatebooking = async (id, val) => {
    console.log(id, val);
    try {
      await axios.patch(
        `https://coolservices.onrender.com/updatebooking/${id}`,
        {
          status: val,
        }
      );
      toast.success("Update successfully!");
      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const showDashboard = async () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex justify-center mt-5">
      <ToastContainer position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        className="w-full max-w-6xl"
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={handleLogout}
            className="text-white  p-2 w-20 bg-green-500 mr-2"
          >
            LogOut
          </button>
          <button
            onClick={showDashboard}
            className="bg-blue-500 p-2 text-white "
          >
            DashBoard
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-serif flex justify-center mb-5">
            Complaints
          </h1>
        </div>
        {/* <Done /> */}

        <table className="text-center w-full mt-10">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Appliance</th>
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
              >
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.appliance}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.phone}</td>
                <td className="border px-4 py-2">{item.time}</td>
                <td className="border px-4 py-2">
                  <select
                    value={item.status}
                    onChange={(e) => updatebooking(item._id, e.target.value)}
                    required
                  >
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </td>
                <td className="p-1 border">
                  <button
                    className="w-24 h-10 bg-red-400 text-white rounded hover:bg-red-600"
                    onClick={() => handledelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default Dashboard;
