import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceData from "./ServiceData";
import StateCard from "./StateCard";
import SearchBooks from "./SearchBooks";
import Status from "../../Components/User/History/Status";
import api from "../../../Utils/axios.js";

function Dashboard() {
  const [booking, setbooking] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [requestDate, setRequestDate] = useState([]);
  const [inputRecord, setInputRecord] = useState(false);
  const [issearch, setIsSearch] = useState(false);
  const [status, setStatus] = useState("");

  const Search = async () => {
    setInputRecord(true);
    setIsSearch(true);

    const find = await api.get("/showbooking/search", {
      params: { startDate, endDate },
    });
    setRequestDate(find.data);
    setIsSearch(false);
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get("/showbooking", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
      await api.delete(`/deletebooking/${id}`);
      toast.success("Deleted successfully!");
      setTimeout(() => fetchBookings(), 500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updatebooking = async (id, val) => {
    try {
      await api.patch(`/updatebooking/${id}`, {
        status: val,
      });
      toast.success("Updated successfully!");
      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTechnician = async (id, val) => {
    try {
      const tech = await api.patch(`/updateTechnician/${id}`, {
        technician: val,
      });

      toast.success("Updated successfully!");
      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getStatusBooking = async (stts) => {
    try {
      const res = await api.get(`/showbooking/status?status=${stts}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success(res.data.message);
      setbooking(res.data);
      setTimeout(() => {
        setStatus("");
      }, 5000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changeStatus = (e) => {
    const newVal = e.target.value;

    setStatus(newVal);
    getStatusBooking(newVal);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Done":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancel":
        return "bg-red-300 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ToastContainer
        position="top-center"
        toastClassName="backdrop-blur-sm"
        bodyClassName="text-sm font-medium"
      />

      <StateCard booking={booking} />
      <div className="flex justify-end mr-5 mb-5">
        <button
          onClick={() => setIsSearch(!issearch)}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-95"
        >
          Search Between Date
        </button>
      </div>

      {issearch && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-2xl z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-600 w-8 h-8 flex items-center justify-center text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => setIsSearch(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pr-8">
              Find Records
            </h2>

            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="startdate"
                  className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  From:
                </label>
                <input
                  type="date"
                  name="startdate"
                  id="startdate"
                  value={startDate}
                  onChange={(e) => setstartDate(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-white focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="enddate"
                  className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  To:
                </label>
                <input
                  type="date"
                  name="enddate"
                  id="enddate"
                  value={endDate}
                  onChange={(e) => setendDate(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-white focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:outline-none"
                />
              </div>

              <button
                onClick={Search}
                className="w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-200 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      <Status changeStatus={changeStatus} status={status} />

      {inputRecord ? (
        <SearchBooks
          requestDate={requestDate}
          getStatusColor={getStatusColor}
          handledelete={handledelete}
          updatebooking={updatebooking}
          updateTechnician={updateTechnician}
        />
      ) : (
        <ServiceData
          booking={booking}
          getStatusColor={getStatusColor}
          handledelete={handledelete}
          updatebooking={updatebooking}
          updateTechnician={updateTechnician}
        />
      )}
    </div>
  );
}

export default Dashboard;
