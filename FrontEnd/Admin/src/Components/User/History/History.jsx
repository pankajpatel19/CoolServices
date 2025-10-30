import {
  ArrowLeft,
  Download,
  Calendar,
  Clock,
  User,
  Building2,
  FileText,
  Phone,
  MapPin,
  Hash,
  CheckCircle,
  Wrench,
} from "lucide-react";
import { useHistoryData } from "../../../Contaxt/HistoryContaxt";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Status from "./Status";
import api from "../../../../Utils/axios";
function History() {
  const { history, loading, setHistory } = useHistoryData();
  const [status, setStatus] = useState("");

  const downloadReciept = async (id) => {
    try {
      const res = await api.get(`/Home/history/${id}/pdf`, {
        responseType: "blob",
      });

      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.log("PDF DownLoad Error");
    }
  };

  const getStatusBooking = async (stts) => {
    try {
      const res = await api.get(`/Home/history/status?status=${stts}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(res.data.message);

      setHistory(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changeStatus = (e) => {
    const newVal = e.target.value;

    setStatus(newVal);
    getStatusBooking(newVal);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
                style={{
                  animationDuration: "1.5s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>
            <div className="text-2xl font-semibold text-gray-700">
              Loading your booking history...
            </div>
            <div className="text-gray-500 mt-2">Please wait a moment</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <ToastContainer
        position="top-center"
        toastClassName="backdrop-blur-sm"
        bodyClassName="text-sm font-medium"
      />
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

      <div className="relative max-w-6xl mx-auto p-6 sm:p-8">
        {/* Enhanced Back Button */}
        <motion.button
          onClick={handleGoBack}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="group flex items-center gap-3 mb-8 px-6 py-3.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
          <span>Back to Home</span>
        </motion.button>

        {/* Enhanced Header */}
        <motion.div
          className="relative mb-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          <div className="relative p-8 sm:p-10 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl mb-5 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-3xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <FileText className="w-10 h-10 text-white relative z-10" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Booking History
            </h2>
            <p className="text-gray-600 text-lg">
              View all your service bookings and their status
            </p>
            <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </motion.div>

        <Status changeStatus={changeStatus} status={status} />

        {history.length > 0 ? (
          <div className="space-y-6">
            {history.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/40 group hover:-translate-y-1"
              >
                <div
                  className={`${
                    item.status === "Done"
                      ? "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"
                      : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                  } text-white px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{item.name}</h3>
                      <div className="text-sm opacity-90 mt-1">
                        Booking #{idx + 1}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <div
                      className={`px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg ${
                        item.status === "Done"
                          ? "bg-white/30 backdrop-blur-sm"
                          : "bg-white/30 backdrop-blur-sm"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.status === "Done" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                        {item.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Card Content */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Appliance */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 group-hover:border-blue-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Appliance
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {item.appliance}
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 group-hover:border-purple-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Company
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {item.company}
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 group-hover:border-green-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Date
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {item.date}
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100 group-hover:border-orange-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Time
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {item.time}
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 group-hover:border-cyan-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Phone
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {item.phone}
                        </div>
                      </div>
                    </div>

                    {/* Pincode */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-rose-50 to-red-50 rounded-xl border border-rose-100 group-hover:border-rose-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Hash className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Pincode
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {item.pincode}
                        </div>
                      </div>
                    </div>

                    {/* Technician */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 group-hover:border-indigo-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Technician
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {item.technician}
                        </div>
                      </div>
                    </div>

                    {/* Issue Date */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 group-hover:border-teal-200 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Issue Date
                        </div>
                        <div className="text-base font-bold text-gray-900 truncate">
                          {new Date(item.issueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address and Issue - Full Width */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Address
                          </div>
                          <div className="text-sm text-gray-800 leading-relaxed">
                            {item.address}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Issue
                          </div>
                          <div className="text-sm text-gray-800 leading-relaxed">
                            {item.issue}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Download Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => downloadReciept(item._id)}
                      className="relative w-full sm:w-auto bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden"
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      <Download className="relative w-5 h-5 group-hover:animate-bounce" />
                      <span className="relative">Download Receipt</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-16 text-center border border-white/40"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-6">
              <FileText className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Booking History Found
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              You haven't made any bookings yet. Start booking services to see
              your history here.
            </p>
            <button
              onClick={() => (window.location.href = "/Home/addbooking")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Book Your First Service
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default History;
