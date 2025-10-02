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
    const interval = setInterval(async () => {
      const res = await axios.get(
        "http://localhost:1916/api/admin/technicians-locations"
      );
      console.log(res.data);

      setLocations(res.data);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-lg w-200 h-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Technician Real-Time Locations
      </h2>

      <MapContainer
        center={[28.6, 77.2]}
        zoom={12}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "12px",
          border: "2px solid #3b82f6",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((tech) => (
          <Marker
            key={tech.technicianId._id}
            position={[tech.latitude, tech.longitude]}
            icon={techIcon}
          >
            {tech.technicianId.userName}

            <Tooltip direction="top" offset={[0, -10]} permanent>
              <p className="font-semibold text-gray-800">
                {tech.technicianId.userName}
              </p>
              <p className="text-sm text-gray-600">{tech.technicianId.phone}</p>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(tech.updatedAt).toLocaleTimeString()}
              </p>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default TechLocation;
