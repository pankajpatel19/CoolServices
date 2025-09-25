import React, { useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Hash,
  Home,
  Wrench,
  Building2,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:1916/Home/addbooking", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      showNotification("Booking Successfully");
      setIsSubmitting(false);
    } catch (e) {
      console.log("gadbAD");
    }
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
  };

  const handleBack = () => {
    // Original navigate function would go here:
    navigate("/Home");
    showNotification("Back button clicked", "info");
  };

  const inputClasses =
    "w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 bg-gray-50/50 hover:bg-white";
  const labelClasses =
    "block mb-2 font-semibold text-gray-700 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      {/* Enhanced ToastContainer equivalent */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm transform transition-all duration-500 border ${
            notification.type === "success"
              ? "bg-green-500/90 text-white border-green-400"
              : notification.type === "error"
              ? "bg-red-500/90 text-white border-red-400"
              : "bg-blue-500/90 text-white border-blue-400"
          }`}
          style={{
            background:
              notification.type === "success"
                ? "rgba(34, 197, 94, 0.95)"
                : notification.type === "error"
                ? "rgba(239, 68, 68, 0.95)"
                : "rgba(59, 130, 246, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderRadius: "12px",
          }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            {notification.message}
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-300/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Enhanced styling for the original container */}
        <div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 relative overflow-hidden"
          style={{ border: "1px solid rgba(192, 192, 192, 0.3)" }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl"></div>

          <div className="relative">
            {/* Enhanced Back Button */}
            <button
              onClick={handleBack}
              className="group flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 border border-blue-600 hover:border-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
            >
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
              Back
            </button>

            {/* Enhanced Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-xl">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-600 mb-2">
                Book a Service
              </h2>
              <p className="text-gray-600">
                Schedule your appliance repair with ease
              </p>
            </div>

            {/* Original form with enhanced styling */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Appliance Type */}
              <div>
                <label className={labelClasses}>
                  <Wrench className="w-5 h-5 text-blue-500" />
                  Appliance Type
                </label>
                <select
                  name="appliance"
                  className={inputClasses}
                  value={form.appliance}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Appliance --</option>
                  <option value="AC">AC</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Company Type */}
              <div>
                <label className={labelClasses}>
                  <Building2 className="w-5 h-5 text-blue-500" />
                  Company Type
                </label>
                <select
                  name="company"
                  className={inputClasses}
                  value={form.company}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Company --</option>
                  <option value="BPL">BPL</option>
                  <option value="Kelvinator">Kelvinator</option>
                  <option value="IBM">IBM</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Issue Description */}
              <div>
                <label className={labelClasses}>
                  <FileText className="w-5 h-5 text-blue-500" />
                  Issue Description
                </label>
                <textarea
                  name="issue"
                  className={`${inputClasses} min-h-[100px] resize-y`}
                  rows="3"
                  placeholder="Describe the issue"
                  value={form.issue}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className={labelClasses}>
                  <Home className="w-5 h-5 text-blue-500" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className={inputClasses}
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Pincode */}
              <div>
                <label className={labelClasses}>
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  className={inputClasses}
                  value={form.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date and Time - Original flex layout */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className={labelClasses}>
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className={inputClasses}
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className={labelClasses}>
                    <Clock className="w-5 h-5 text-blue-500" />
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    className={inputClasses}
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className={labelClasses}>
                  <User className="w-5 h-5 text-blue-500" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={inputClasses}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className={labelClasses}>
                  <Phone className="w-5 h-5 text-blue-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className={inputClasses}
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClasses}>
                  <Mail className="w-5 h-5 text-blue-500" />
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  className={inputClasses}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* Original Submit Button with enhanced styling */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-3 px-8 py-3 text-lg font-semibold text-white rounded-xl shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25 hover:shadow-blue-500/40"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Submit Booking
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
