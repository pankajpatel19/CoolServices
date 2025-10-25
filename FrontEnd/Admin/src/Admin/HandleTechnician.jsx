import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function HandleTechnician() {
  const [Technician, settechnician] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, techId: null }); // Modal state
  const token = localStorage.getItem("token");

  const getTechnician = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://coolservices.onrender.com/handleTechnician",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      settechnician(res.data);
      setError(null);
    } catch (error) {
      console.log("Error is : ", error);
      setError("Failed to fetch technicians");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setModal({ isOpen: true, techId: id });
  };

  const cancelDelete = () => {
    setModal({ isOpen: false, techId: null });
  };

  const confirmDelete = async () => {
    if (!modal.techId) return;

    try {
      const res = await axios.delete(
        `https://coolservices.onrender.com/handleTechnician/${modal.techId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res.data);
      getTechnician(); // Refresh the list
      toast.success(res.data.message || "Technician deleted successfully");
    } catch (error) {
      console.log("error", error);
      toast.error(
        error.response?.data?.message || "Failed to delete technician"
      );
    } finally {
      setModal({ isOpen: false, techId: null }); // Close modal
    }
  };

  useEffect(() => {
    getTechnician();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading technicians...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Technicians
          </h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this technician? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Technicians
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Empty State */}
        {Technician.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Technicians Found
            </h3>
            <p className="text-gray-500">
              There are currently no technicians to display.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Technician.length}
                  </div>
                  <div className="text-gray-600 font-medium">
                    Total Technicians
                  </div>
                </div>
              </div>
            </div>

            {/* Technician Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Technician.map((Tech) => (
                <div
                  key={Tech._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Header with Avatar */}
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {Tech.userName
                        ? Tech.userName.charAt(0).toUpperCase()
                        : "T"}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                        {Tech.userName || "Unknown"}
                      </h3>
                      <div className="w-8 h-0.5 bg-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-start">
                      <div className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Email
                        </div>
                        <div className="text-gray-800 break-words">
                          {Tech.email || "Not provided"}
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start">
                      <div className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Phone
                        </div>
                        <div className="text-gray-800 break-words">
                          {Tech.Phone || "Not provided"}
                        </div>
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="flex items-start">
                      <div className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Joined
                        </div>
                        <div className="text-gray-800 break-words">
                          {Tech.joinAt
                            ? formatDate(Tech.joinAt)
                            : "Not available"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Delete Button and Status */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Active
                    </span>

                    <button
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200"
                      onClick={() => handleDeleteClick(Tech._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HandleTechnician;
