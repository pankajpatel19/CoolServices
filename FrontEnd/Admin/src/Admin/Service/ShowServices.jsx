import React from "react";
import { toast } from "react-toastify";
import api from "../../../Utils/axios";
import { useState, useEffect } from "react";

function ShowServices() {
  const [services, setServices] = useState([]);
  const [appliance, setAppliance] = useState("AC");

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
          <div className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                Our Services
              </h1>
              <p className="text-center text-gray-500 mb-12">
                Professional care for your home appliances.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white shadow-xl rounded-2xl border-2 border-transparent hover:border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                  >
                    {/* --- Popular Badge --- */}
                    {service.isPopular && (
                      <div className="absolute top-4 right-[-1px] bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-l-full shadow-md z-10">
                        ★ Popular
                      </div>
                    )}

                    {/* --- Media Section (Video or Image) --- */}
                    <div className="relative overflow-hidden bg-gray-200">
                      {service.videoUrl ? (
                        <video
                          src={service.videoUrl}
                          controls
                          className="w-full aspect-video object-cover"
                        />
                      ) : service.imageUrl ? (
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : null}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      {/* --- Header --- */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 leading-tight flex-1">
                          {service.name}
                        </h3>
                        <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                          {service.appliance}
                        </span>
                      </div>

                      {/* --- Description --- */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed h-10">
                        {service.description}
                      </p>

                      {/* --- Included Items Pills --- */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.includedItems.slice(0, 3).map((item) => (
                            <span
                              key={item}
                              className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* --- Footer --- */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div>
                          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ₹{service.price}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            ⭐ {service.rating} &nbsp;•&nbsp; 🕒{" "}
                            {service.duration}
                          </div>
                        </div>

                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
