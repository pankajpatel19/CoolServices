import React, { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  Wrench,
  Building2,
  FileText,
  CheckCircle,
  Sparkles,
  Hash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- Form Helper Components ---

const FormField = ({ label, icon: Icon, children }) => (
  <div className="group">
    <label className="block mb-1.5 font-semibold text-gray-700 flex items-center gap-2 text-sm uppercase tracking-wide">
      {Icon && <Icon className="w-4 h-4 text-blue-500" />}
      {label}
    </label>
    {children}
  </div>
);

const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 bg-white hover:shadow-md text-gray-800 placeholder-gray-400 text-sm ${className}`}
    {...props}
  />
));

const Select = ({ children, className = "", ...props }) => (
  <div className="relative">
    <select
      className={`w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 bg-white hover:shadow-md text-gray-800 appearance-none cursor-pointer pr-10 text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

const TrustIndicator = ({ label, value, color }) => (
  <div className="bg-white/70 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/50">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-gray-600 mt-1">{label}</div>
  </div>
);

const Booking = () => {
  const [form, setForm] = useState({
    appliance: "",
    company: "",
    issue: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/api/bookings/Home/addbooking", form);
      toast.success("Booking Placed Successfully!");
      setForm({
        appliance: "",
        company: "",
        issue: "",
        address: "",
        pincode: "",
        date: "",
        time: "",
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to book service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-6 md:p-8"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          {/* Action Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/home")}
              className="group flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg text-xs"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">New Booking</h2>
                <p className="text-xs text-gray-500">Fill details below</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Appliance Info Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Appliance Type" icon={Wrench}>
                <Select
                  name="appliance"
                  value={form.appliance}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Appliance</option>
                  <option value="AC">Air Conditioner</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Other">Other</option>
                </Select>
              </FormField>

              <FormField label="Company Brand" icon={Building2}>
                <Select
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="BPL">BPL</option>
                  <option value="Kelvinator">Kelvinator</option>
                  <option value="IBM">IBM</option>
                  <option value="Other">Other</option>
                </Select>
              </FormField>
            </div>

            <FormField label="Detailed Issue" icon={FileText}>
              <textarea
                name="issue"
                className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 min-h-[80px] resize-none text-sm"
                placeholder="Describe the problem..."
                value={form.issue}
                onChange={handleChange}
                required
              />
            </FormField>

            {/* Logistics Section */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField label="Service Address" icon={MapPin}>
                  <Input
                    name="address"
                    placeholder="Full Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </FormField>
              </div>
              <FormField label="Pincode" icon={Hash}>
                <Input
                  name="pincode"
                  placeholder="000 000"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                />
              </FormField>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Preferred Date" icon={Calendar}>
                <Input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField label="Preferred Time" icon={Clock}>
                <Input
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </FormField>
            </div>

            {/* Contact Section */}
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <User className="w-5 h-5 text-blue-600" />
                Contact Details
              </h3>
              <FormField label="Full Name" icon={User}>
                <Input
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Phone" icon={Phone}>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+91 ..."
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </FormField>
                <FormField label="Email (Optional)" icon={Mail}>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </FormField>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 text-center">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full md:w-auto px-10 py-3.5 text-base font-bold text-white rounded-2xl shadow-xl transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-blue-500/25"
                }`}
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </motion.button>
              <p className="mt-3 text-[10px] text-gray-400 uppercase tracking-widest">
                Service fee applicable at doorstep
              </p>
            </div>
          </form>
        </motion.div>

        {/* Footer Indicators */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <TrustIndicator
            label="Available"
            value="24/7"
            color="text-blue-600"
          />
          <TrustIndicator
            label="Satisfaction"
            value="100%"
            color="text-green-600"
          />
          <TrustIndicator
            label="Service"
            value="Fast"
            color="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
