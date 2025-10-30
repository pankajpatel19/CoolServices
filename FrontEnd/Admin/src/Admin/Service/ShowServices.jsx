import React from "react";
import { toast } from "react-toastify";
import api from "../../../Utils/axios";
import { useState, useEffect } from "react";

function ShowServices() {
  const [services, setServices] = useState([]);
  const [appliance, setAppliance] = useState("");

  const fetchServices = async () => {
    try {
      const { data } = await api.get(
        `${
          import.meta.env.VITE_API_URL
        }/services/appliance?appliance=${appliance}`
      );

      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [appliance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Select Appliance
          </h2>

          <div className="relative max-w-xs">
            <select
              value={appliance}
              onChange={(e) => setAppliance(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 pr-10 text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none appearance-none bg-white cursor-pointer shadow-sm"
            >
              <option value="">All Appliances</option>
              <option value="AC">🌡️ AC</option>
              <option value="Refrigerator">❄️ Refrigerator</option>
              <option value="Washing Machine">🧺 Washing Machine</option>
              <option value="Water Purifier">💧 Water Purifier</option>
              <option value="Microwave">🍲 Microwave</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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

        {/* Services List */}
        {services.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white shadow-xl rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {service.videoUrl && (
                  <div className="relative overflow-hidden bg-gray-900">
                    <video
                      src={service.videoUrl}
                      controls
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight flex-1">
                      {service.name}
                    </h3>
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {service.appliance}
                    </span>
                  </div>

                  <h3 className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {service.description}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ₹{service.price}
                    </p>

                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-2xl font-bold text-gray-800 mb-2">
                No Services Found
              </p>
              <p className="text-gray-500">
                {appliance
                  ? `No services available for ${appliance}`
                  : "No services available at the moment"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowServices;
