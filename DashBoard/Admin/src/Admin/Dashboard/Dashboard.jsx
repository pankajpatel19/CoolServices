import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceData from "./ServiceData";
import HeaderDash from "./HeaderDash";
import StateCard from "./StateCard";
import SearchBooks from "./SearchBooks";

function Dashboard() {
  const [booking, setbooking] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [requestDate, setRequestDate] = useState([]);
  const [inputRecord, setInputRecord] = useState(false);
  const [issearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const Search = async () => {
    setInputRecord(true);
    setIsSearch(true);

    const find = await axios.get(`http://localhost:1916/showbooking/search`, {
      params: { startDate, endDate },
    });
    setRequestDate(find.data);
    setIsSearch(false);
  };

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
      setTimeout(() => fetchBookings(), 500);
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

  const updateTechnician = async (id, val) => {
    try {
      const tech = await axios.patch(
        `http://localhost:1916/updateTechnician/${id}`,
        {
          technician: val,
        }
      );

      toast.success("Updated successfully!");
      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:1916/logout", { withCredentials: true });
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("LogOut SuccessFully");
    navigate("/login");
    window.location.reload();
  };
  const showDashboard = () => navigate("/dashboard");
  const showTechnician = () => navigate("/techhome/handleTechnician");
  const showTechnicianLocation = () => navigate("/TechLocations");

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
      <HeaderDash
        showDashboard={showDashboard}
        handleLogout={handleLogout}
        showTechnician={showTechnician}
        showTechnicianLocation={showTechnicianLocation}
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
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50  backdrop-blur-2xl z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              className="bg-red-600 w-5 h-5 text-center text-white"
              onClick={() => setIsSearch(false)}
            >
              X
            </button>
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Records
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 items-end justify-center">
              <div className="flex flex-col space-y-2 min-w-0 flex-1">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2 min-w-0 flex-1">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:outline-none"
                />
              </div>

              <button
                onClick={Search}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
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
