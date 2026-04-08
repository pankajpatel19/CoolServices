import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
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
  FileText,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/axios";

function BookData() {
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
      case "New": return "bg-blue-100 text-blue-700 border-blue-200";
      case "In Progress": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Done": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Records...</p>
        </motion.div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white/40 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Record Missing</h2>
          <p className="text-slate-500 font-medium mb-8">The requested service file could not be discovered or has been archived.</p>
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all"
          >
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <ToastContainer position="top-center" toastClassName="backdrop-blur-xl shadow-2xl rounded-2xl" />

      {/* Premium Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/40 px-4 py-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-white/70 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Service Control</h1>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none">ID: {booking._id?.slice(-12)}</p>
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
            {booking.status}
          </div>
        </div>
      </motion.div>

      <main className="max-w-5xl mx-auto px-4 mt-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/40 overflow-hidden"
        >
          {/* Customer Identity Area */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
               <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black border-2 border-white/30 shadow-2xl">
                 {booking.name?.charAt(0)}
               </div>
               <div className="text-center md:text-left">
                  <h2 className="text-4xl font-black tracking-tight mb-2">{booking.name}</h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-blue-100 font-bold text-sm">
                    <span className="flex items-center gap-2"><Phone className="w-4 h-4 opacity-70" /> {booking.phone}</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full hidden md:block"></span>
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 opacity-70" /> Primary Customer</span>
                  </div>
               </div>
             </div>
          </div>

          <div className="p-10 space-y-12">
            {/* Core Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Appliance Type", value: booking.appliance, icon: Wrench, color: "blue" },
                { label: "System Manufacturer", value: booking.company, icon: Building2, color: "purple" },
                { label: "Service Logic", value: "Verified Inquiry", icon: CheckCircle2, color: "emerald" }
              ].map((spec, i) => (
                <div key={i} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/50 group hover:border-indigo-100 transition-colors">
                  <div className={`p-3 bg-${spec.color}-100 rounded-2xl text-${spec.color}-600 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <spec.icon className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-lg font-black text-slate-800 tracking-tight">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Schedule Console */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
               <div className="relative z-10">
                 <h3 className="text-lg font-black uppercase tracking-widest text-indigo-400 mb-8 flex items-center gap-3">
                   <Calendar className="w-5 h-5" />
                   Appointment Window
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/5">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target Date</p>
                        <p className="text-2xl font-black tracking-tight">{booking.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-purple-400 border border-white/5">
                        <Clock className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Time Slot</p>
                        <p className="text-2xl font-black tracking-tight uppercase">{booking.time}</p>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Description / Logs */}
            <div className="space-y-6">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                 <FileText className="w-6 h-6 text-indigo-600" />
                 Diagnostic Report
               </h3>
               <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                 <p className="text-slate-600 font-medium leading-relaxed">
                   {booking.issue || booking.description || "No specific technical diagnostics provided for this request."}
                 </p>
               </div>
            </div>

            {/* Operator Assignment Display */}
            <div className="pt-8 border-t border-slate-50 flex flex-wrap items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Assigned Tech</p>
                    <p className="text-sm font-black text-slate-700">{booking.technician || "Unassigned Operations"}</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-2 opacity-30 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                 <ShieldCheck className="w-4 h-4" />
                 Encrypted Forensic Log Entry
               </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default BookData;
