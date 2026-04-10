import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  Wrench,
  Building2,
  Calendar,
  Clock,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/axios.js";

function Call() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/showbooking/${id}`);
        setBooking(res.data);
      } catch (error) {
        toast.error("Failed to fetch booking details");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Done":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500/10 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-600 text-lg font-bold tracking-tight">
            Fetching Details...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40 max-w-md w-full"
        >
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No booking found
          </h3>
          <p className="text-gray-500 mb-8 font-medium">
            The requested booking details are not available or have been
            removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans pb-12">
      <ToastContainer
        position="top-center"
        toastClassName="backdrop-blur-sm shadow-xl"
        bodyClassName="font-medium"
      />

      {/* Header Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Booking Details
                </h1>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">
                  #{booking._id?.slice(-8)}
                </p>
              </div>
            </div>

            <div
              className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}
            >
              {booking.status}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-12 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl font-black border-2 border-white/30 shadow-2xl">
                {booking.name?.charAt(0)}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-black mb-1">{booking.name}</h2>
                <div className="flex items-center gap-2 text-blue-100 font-medium opacity-90 justify-center sm:justify-start">
                  <Phone className="w-4 h-4" />
                  {booking.phone}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Wrench,
                  label: "Appliance",
                  value: booking.appliance,
                  color: "blue",
                },
                {
                  icon: Building2,
                  label: "Brand",
                  value: booking.company,
                  color: "purple",
                },
                {
                  icon: ClipboardList,
                  label: "Status",
                  value: booking.status,
                  color: "emerald",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`bg-gradient-to-br from-${stat.color}-50/50 to-white p-5 rounded-2xl border border-${stat.color}-100 flex items-center gap-4 group hover:shadow-lg transition-all`}
                >
                  <div
                    className={`p-3 bg-${stat.color}-100 rounded-xl text-${stat.color}-600 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-black text-${stat.color}-400 uppercase tracking-widest`}
                    >
                      {stat.label}
                    </p>
                    <p className={`text-lg font-black text-${stat.color}-900`}>
                      {stat.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Schedule Section */}
            <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                Service Schedule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 border border-blue-50 font-bold">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Appointment Date
                    </p>
                    <p className="text-xl font-black text-slate-700">
                      {booking.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-600 border border-purple-50 font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Service Time
                    </p>
                    <p className="text-xl font-black text-slate-700">
                      {booking.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            {booking.issue && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
                  <ClipboardList className="w-5 h-5 text-indigo-500" />
                  Reported Issue
                </h3>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-inner">
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {booking.issue}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Branding */}
          <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex justify-center">
            <div className="flex items-center gap-2 opacity-30 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
              <CheckCircle2 className="w-4 h-4" />
              Verified Service Request
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Call;
