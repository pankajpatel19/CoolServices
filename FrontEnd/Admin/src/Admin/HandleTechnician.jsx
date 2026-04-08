import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  UserPlus, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  Filter, 
  AlertTriangle,
  Users,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import api from "../utils/axios";
import "react-toastify/dist/ReactToastify.css";

function HandleTechnician() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, techId: null });

  const getTechnicians = async () => {
    try {
      setLoading(true);
      const res = await api.get("/handleTechnician");
      setTechnicians(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching technicians:", err);
      setError("Failed to fetch technicians. Please authorize or check connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setModal({ isOpen: true, techId: id });
  };

  const confirmDelete = async () => {
    if (!modal.techId) return;
    try {
      const res = await api.delete(`/handleTechnician/${modal.techId}`);
      toast.success(res.data.message || "Technician removed successfully");
      getTechnicians();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setModal({ isOpen: false, techId: null });
    }
  };

  useEffect(() => {
    getTechnicians();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">Synchronizing Staff...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-8 space-y-10">
      <ToastContainer position="top-center" toastClassName="backdrop-blur-xl shadow-2xl rounded-2xl" />

      {/* Modern Confirmation Modal */}
      <AnimatePresence>
        {modal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setModal({ isOpen: false, techId: null })}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-red-50 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Remove Technician?</h2>
                <p className="text-slate-500 font-medium">This professional will lose all access. This action cannot be reverted.</p>
              </div>
              <div className="p-6 flex gap-3">
                <button 
                  onClick={() => setModal({ isOpen: false, techId: null })}
                  className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-100 transition-all"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Aesthetic Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-200">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Management</h1>
            </div>
            <p className="text-slate-500 font-bold flex items-center gap-2 px-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {technicians.length} Active Technicians
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin/add_technician"
              className="px-6 py-4 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:bg-indigo-600 transition-all flex items-center gap-3 active:scale-95"
            >
              <UserPlus className="w-5 h-5" />
              Add Professional
            </Link>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap gap-4">
          <div className="relative group flex-1 min-w-[300px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name, skill, or ID..." 
              className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-slate-700"
            />
          </div>
          <button className="px-6 py-4 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl text-slate-600 hover:text-indigo-600 shadow-sm transition-all flex items-center gap-2 font-bold">
            <Filter className="w-5 h-5" />
            Advanced Filter
          </button>
        </div>

        {/* Content Section */}
        {error ? (
          <div className="bg-red-50/50 backdrop-blur-md border border-red-100 p-8 rounded-3xl text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-700 font-bold">{error}</p>
            <button onClick={getTechnicians} className="mt-4 text-red-600 font-black uppercase text-xs tracking-widest hover:underline">Retry Connection</button>
          </div>
        ) : technicians.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-xl border border-white/40 p-20 rounded-[3rem] text-center shadow-xl">
            <Users className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-400">Registry Empty</h3>
            <p className="text-slate-400 font-medium">No professional technicians discovered in the database.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {technicians.map((tech) => (
              <motion.div
                key={tech._id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col"
              >
                {/* Visual Identity */}
                <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 relative">
                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                    Verified
                  </div>
                  <div className="absolute -bottom-10 left-8">
                    <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-2xl transform group-hover:rotate-3 transition-transform">
                      <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center text-2xl font-black text-indigo-600">
                        {tech.userName?.charAt(0).toUpperCase() || "T"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="pt-14 p-8 flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {tech.userName || "Professional"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status: Available</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                      <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Electronic Mail</p>
                        <p className="text-sm font-bold text-slate-700 truncate">{tech.email || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                      <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Secure Line</p>
                        <p className="text-sm font-bold text-slate-700">{tech.Phone || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                      <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Member Since</p>
                        <p className="text-sm font-bold text-slate-700">{tech.joinAt ? formatDate(tech.joinAt) : "Dec 2023"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-8 pt-0 mt-auto flex items-center justify-between">
                  <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest group/btn">
                    View Logs
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(tech._id)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default HandleTechnician;
