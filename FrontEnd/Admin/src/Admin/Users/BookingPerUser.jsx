import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Wrench,
  FileText,
  MapPin,
  UserCheck,
  Calendar,
  Clock,
  Loader,
  AlertCircle,
  ArrowLeft,
  ClipboardList,
} from "lucide-react";
import api from "../../../Utils/axios";

function BookingPerUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FetchBookingPerUser = async () => {
    try {
      setError(null);
      const response = await api.get(`/api/admin/getBookingPerUser/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBooking(response.data.BookingPerUser);
    } catch (error) {
      setError("Failed to fetch bookings. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchBookingPerUser();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "done":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">
            Loading bookings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-800 mt-1">{error}</p>
              <button
                onClick={FetchBookingPerUser}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ClipboardList className="w-6 h-6 text-indigo-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                User Bookings
              </h1>
            </div>
            <p className="text-gray-600">Total bookings: {booking.length}</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Bookings List */}
        {booking.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              No bookings found for this user.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {booking.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {item.name}
                        </h3>
                        <p className="text-indigo-100 text-sm">
                          Booking ID: {item._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                        Contact Information
                      </h4>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">
                            Email
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">
                            Phone
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                        Service Details
                      </h4>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                          <Wrench className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">
                            Appliance
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.appliance}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg flex-shrink-0">
                          <UserCheck className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">
                            Technician
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.technician || "Not Assigned"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                        Schedule
                      </h4>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-50 rounded-lg flex-shrink-0">
                          <Calendar className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">
                            Date
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(item.issueDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                          <Clock className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">
                            Time
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.time || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Issue Description */}
                  {item.issue && (
                    <div className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                          <FileText className="w-4 h-4 text-yellow-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-yellow-900 mb-2">
                            Issue Description
                          </p>
                          <p className="text-sm text-yellow-800">
                            {item.issue}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {item.address && (
                    <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                          <MapPin className="w-4 h-4 text-blue-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-900 mb-2">
                            Service Address
                          </p>
                          <p className="text-sm text-blue-800">
                            {item.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPerUser;
