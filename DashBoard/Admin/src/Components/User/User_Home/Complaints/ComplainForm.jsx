import React, { useState } from "react";
import { AlertCircle, Send, User, Mail, MessageSquare } from "lucide-react";

function ComplainForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Complaint submitted successfully!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Submit a Complaint</h1>
            <p className="text-red-100 mt-1">
              We're here to help resolve your concerns
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-6 rounded-b-lg border border-gray-200 space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Enter your email address"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Brief summary of your complaint"
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            placeholder="Please describe your complaint in detail..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            <span>Submit Complaint</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            We'll respond to your complaint within 24-48 hours
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComplainForm;
