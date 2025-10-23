import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

// Custom icon for technician
const techIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/3588/3588614.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

function TechLocation() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1916/api/admin/technicians-locations"
        );
        setLocations(res.data);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Technician Tracking
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time location monitoring
              </p>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-100">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                {locations.length} Active{" "}
                {locations.length === 1 ? "Technician" : "Technicians"}
              </span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <MapContainer
            center={[28.6, 77.2]}
            zoom={12}
            style={{
              height: "700px",
              width: "100%",
            }}
            scrollWheelZoom={true}
            className="map-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {locations.map((tech) => (
              <Marker
                key={tech._id}
                position={[tech.latitude, tech.longitude]}
                icon={techIcon}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <p className="font-bold text-lg text-gray-800 mb-2">
                      {tech.technicianId?.userName || "Unknown"}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="font-semibold">📞</span>
                        {tech.technicianId?.phone || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="font-semibold">🕐</span>
                        {new Date(tech.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Popup>

                <Tooltip
                  direction="top"
                  offset={[0, -35]}
                  permanent
                  className="custom-tooltip"
                >
                  <div className="text-center">
                    <p className="font-bold text-sm text-gray-900">
                      {tech.technicianId?.userName}
                    </p>
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👨‍🔧</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Technicians</p>
                <p className="text-2xl font-bold text-gray-800">
                  {locations.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Locations Tracked</p>
                <p className="text-2xl font-bold text-gray-800">
                  {locations.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Update Frequency</p>
                <p className="text-2xl font-bold text-gray-800">5s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechLocation;
