import React, { useState } from "react";
import {
  AlertCircle,
  Send,
  User,
  Mail,
  MessageSquare,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../../../../../Utils/axios";
function ComplainForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      showNotification("Complaint submitted successfully!");
      setIsSubmitting(false);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 px-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Enhanced Notification Toast */}
      {notification && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed top-8 right-8 z-50 px-7 py-5 rounded-2xl shadow-2xl backdrop-blur-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
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
        </motion.div>
      )}

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
        >
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-orange-600 text-white p-8 sm:p-10 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            {/* Floating Sparkle */}
            <div className="absolute top-6 right-6 text-yellow-300/30 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="relative flex items-start gap-5">
              {/* Icon */}
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <AlertCircle className="w-9 h-9" />
              </div>

              {/* Text */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Submit a Complaint
                </h1>
                <p className="text-red-100 text-lg">
                  We're here to help resolve your concerns quickly
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <div className="p-8 sm:p-10 space-y-7">
            {/* Name Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white hover:border-gray-300 hover:shadow-md text-gray-800"
                placeholder="Enter your full name"
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white hover:border-gray-300 hover:shadow-md text-gray-800"
                placeholder="your.email@example.com"
                required
              />
            </motion.div>

            {/* Subject Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-500" />
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white hover:border-gray-300 hover:shadow-md text-gray-800"
                placeholder="Brief summary of your complaint"
                required
              />
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-500" />
                Detailed Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 resize-y bg-white hover:border-gray-300 hover:shadow-md text-gray-800"
                placeholder="Please describe your complaint in detail..."
                required
              />
            </motion.div>

            {/* Enhanced Submit Button */}
            <motion.div
              className="pt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`relative w-full text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl overflow-hidden group ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 transform hover:scale-105 hover:-translate-y-1"
                }`}
                style={{
                  boxShadow: isSubmitting
                    ? ""
                    : "0 20px 40px -10px rgba(239, 68, 68, 0.5)",
                }}
              >
                {/* Shine Effect */}
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}

                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-lg">Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="relative w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="relative text-lg">Submit Complaint</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Enhanced Footer Note */}
            <motion.div
              className="pt-6 border-t-2 border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-700 text-center font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  We'll respond to your complaint within 24-48 hours
                </p>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600">Fast</div>
                <div className="text-xs text-gray-600 mt-1">Response</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">Confidential</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600">24/7</div>
                <div className="text-xs text-gray-600 mt-1">Available</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ComplainForm;
