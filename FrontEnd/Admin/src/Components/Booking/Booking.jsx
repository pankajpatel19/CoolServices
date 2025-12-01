import React, { useState } from "react";
import Api from "../../../Utils/axios.js";
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
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../Utils/axios.js";

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
  const [focusedField, setFocusedField] = useState(null);
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
      const res = await api.post("/Home/addbooking", form);

      showNotification("Booking Successfully");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error?.message);
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
    navigate("/Home");
    showNotification("Back button clicked", "info");
  };

  const inputClasses =
    "w-full border-2 border-gray-200 px-5 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 bg-white hover:shadow-md text-gray-800 placeholder-gray-400";
  const labelClasses =
    "block mb-2.5 font-semibold text-gray-700 flex items-center gap-2.5 text-sm uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {notification && (
        <div
          className={`fixed top-8 right-8 z-50 px-7 py-5 rounded-2xl shadow-2xl backdrop-blur-xl transform transition-all duration-500 animate-in slide-in-from-right ${
            notification.type === "success"
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              : notification.type === "error"
              ? "bg-gradient-to-r from-red-500 to-rose-600 text-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          }`}
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            animation: "slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="font-medium text-lg">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-white/90 hover:text-white bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all duration-200"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto">
        {/* Enhanced Main Container */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-10 md:p-14 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-blue-50/30 rounded-3xl pointer-events-none"></div>

          {/* Floating Sparkles */}
          <div className="absolute top-10 right-10 text-yellow-400/20 animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <div
            className="absolute bottom-10 left-10 text-blue-400/20 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="relative">
            {/* Enhanced Back Button */}
            <button
              onClick={handleBack}
              className="group flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-8 border border-gray-600 hover:border-gray-700"
            >
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="font-semibold">Back to Home</span>
            </button>

            {/* Enhanced Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl mb-5 shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-3xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <Wrench className="w-10 h-10 text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Book Your Service
              </h2>
              <p className="text-gray-600 text-lg">
                Professional appliance repair at your doorstep
              </p>
              <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className={labelClasses}>
                    <Wrench className="w-5 h-5 text-blue-500" />
                    Appliance Type
                  </label>
                  <div className="relative">
                    <select
                      name="appliance"
                      className={`${inputClasses} appearance-none cursor-pointer pr-12`}
                      value={form.appliance}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("appliance")}
                      onBlur={() => setFocusedField(null)}
                      required
                    >
                      <option value="">Select Appliance</option>
                      <option value="AC">Air Conditioner</option>
                      <option value="Refrigerator">Refrigerator</option>
                      <option value="Washing Machine">Washing Machine</option>
                      <option value="Other">Other</option>
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
                </div>

                {/* Company Type */}
                <div className="group">
                  <label className={labelClasses}>
                    <Building2 className="w-5 h-5 text-blue-500" />
                    Company Brand
                  </label>
                  <div className="relative">
                    <select
                      name="company"
                      className={`${inputClasses} appearance-none cursor-pointer pr-12`}
                      value={form.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      required
                    >
                      <option value="">Select Brand</option>
                      <option value="BPL">BPL</option>
                      <option value="Kelvinator">Kelvinator</option>
                      <option value="IBM">IBM</option>
                      <option value="Other">Other</option>
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
                </div>
              </div>

              {/* Issue Description */}
              <div className="group">
                <label className={labelClasses}>
                  <FileText className="w-5 h-5 text-blue-500" />
                  Issue Description
                </label>
                <textarea
                  name="issue"
                  className={`${inputClasses} min-h-[120px] resize-y`}
                  rows="4"
                  placeholder="Please describe the issue in detail..."
                  value={form.issue}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("issue")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Address & Pincode */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 group">
                  <label className={labelClasses}>
                    <Home className="w-5 h-5 text-blue-500" />
                    Service Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className={inputClasses}
                    placeholder="Enter your complete address"
                    value={form.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>

                <div className="group">
                  <label className={labelClasses}>
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    className={inputClasses}
                    placeholder="000000"
                    value={form.pincode}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("pincode")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
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
                    onFocus={() => setFocusedField("date")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
                <div className="group">
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
                    onFocus={() => setFocusedField("time")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>

                <div className="space-y-5">
                  <div className="group">
                    <label className={labelClasses}>
                      <User className="w-5 h-5 text-blue-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={inputClasses}
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className={labelClasses}>
                        <Phone className="w-5 h-5 text-blue-500" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className={inputClasses}
                        placeholder="+91 00000 00000"
                        value={form.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>

                    <div className="group">
                      <label className={labelClasses}>
                        <Mail className="w-5 h-5 text-blue-500" />
                        Email{" "}
                        <span className="text-gray-400 normal-case text-xs">
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={inputClasses}
                        placeholder="your.email@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full relative inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white rounded-2xl shadow-2xl overflow-hidden group transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
                  }`}
                  style={{
                    boxShadow: isSubmitting
                      ? ""
                      : "0 20px 40px -10px rgba(59, 130, 246, 0.5)",
                  }}
                >
                  {/* Animated Background */}
                  {!isSubmitting && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </>
                  )}

                  <span className="relative flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing Your Booking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        Confirm & Book Service
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Terms & Conditions Note */}
              <p className="text-center text-sm text-gray-500 mt-4">
                By submitting, you agree to our{" "}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  Terms & Conditions
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-xs text-gray-600 mt-1">Available</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-xs text-gray-600 mt-1">Satisfaction</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-purple-600">Fast</div>
            <div className="text-xs text-gray-600 mt-1">Service</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
