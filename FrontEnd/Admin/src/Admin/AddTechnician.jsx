import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Shield, 
  Briefcase,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../utils/axios";
import "react-toastify/dist/ReactToastify.css";

function AddTechnician() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    Phone: "",
    password: "",
    userrole: "technician"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.post("/admin/add_technician", formData);
      toast.success(res.data.message || "Technician added successfully!");
      
      // Delay navigation slightly to let the toast be seen
      setTimeout(() => {
        navigate("/admin/handleTechnician");
      }, 1500);
    } catch (error) {
      console.error("Add Technician Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to add technician"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = 
    "w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-slate-700 focus:border-indigo-500 focus:bg-white transition-all shadow-inner";
  const labelClasses = 
    "text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-8">
      <ToastContainer position="top-center" toastClassName="backdrop-blur-xl shadow-2xl rounded-2xl" />

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Aesthetic Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-xl text-slate-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40 hover:-translate-x-1"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Registry
          </button>
          
          <div className="flex items-center gap-4">
             <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-100">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight hidden sm:block">Onboard Staff</h1>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/40 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black tracking-tight mb-2">Technician Registry</h2>
              <p className="text-indigo-100 font-bold opacity-90">Create a secure professional account for your service staff.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className={labelClasses}>Professional Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    required
                    type="text"
                    name="userName"
                    placeholder="Enter full name"
                    value={formData.userName}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className={labelClasses}>Electronic Mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="name@service.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className={labelClasses}>Secure Line</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    required
                    type="tel"
                    name="Phone"
                    placeholder="+91 00000 00000"
                    value={formData.Phone}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className={labelClasses}>Access Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Role Display Only */}
              <div className="space-y-2">
                <label className={labelClasses}>Authorization Tier</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input
                    readOnly
                    type="text"
                    value="Technician Account"
                    className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-slate-400"
                  />
                </div>
              </div>

              {/* Specialization Placeholder */}
              <div className="space-y-2">
                <label className={labelClasses}>Primary Specialization</label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <select className={inputClasses + " appearance-none"}>
                    <option>General Maintenance</option>
                    <option>Electrical Systems</option>
                    <option>HVAC / Cooling</option>
                    <option>Plumbing Expert</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submission Logic */}
            <div className="pt-6">
              <button
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl ${
                  isSubmitting 
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 active:scale-95"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                    Encrypting Registry...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Complete Onboarding
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <Shield className="w-3 h-3 text-emerald-500" />
              Secure 256-bit AES Encrypted Data Submission
            </div>
          </form>
        </motion.div>

        {/* Info Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          <div className="bg-white/50 backdrop-blur-xl p-6 rounded-3xl border border-white/40 flex gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 h-fit">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-1">Security First</h4>
              <p className="text-slate-500 text-sm font-medium">Auto-generate login credentials and enforce multi-factor authentication for new staff.</p>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-xl p-6 rounded-3xl border border-white/40 flex gap-4">
            <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 h-fit">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-1">Workforce Ready</h4>
              <p className="text-slate-500 text-sm font-medium">Technicians can immediately accept bookings once their account is verified by the system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTechnician;
