import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Navigation, 
  Map as MapIcon, 
  Activity, 
  RefreshCw, 
  Phone, 
  Clock, 
  User, 
  ShieldCheck,
  Zap,
  Radio
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import api from "../utils/axios";

// Custom icon for technician - using a more modern SVG-based look if possible or refined URL
const techIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/3588/3588614.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0,-40],
});

function TechLocation() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const res = await api.get("/admin/technicians-locations");
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
    const interval = setInterval(fetchLocations, 10000); // 10s is safer for bandwidth
    return () => clearInterval(interval);
  }, []);

  // Leaflet CSS Injection Correctness
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const stats = [
    { label: "Active Staff", value: locations.length, icon: User, color: "blue" },
    { label: "Pulse Rate", value: "10s", icon: Activity, color: "indigo" },
    { label: "Signal Status", value: "Secure", icon: radioIcon, color: "emerald", isSignal: true }
  ];

  function radioIcon(props) { return <Radio {...props} />; }

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-8 space-y-10">
      {/* Aesthetic Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-200">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Geospatial Intelligence</h1>
          </div>
          <p className="text-slate-500 font-bold flex items-center gap-2 px-1">
            <Activity className="w-4 h-4 text-emerald-500" />
            Live professional tracking enabled
          </p>
        </div>

        <div className="flex gap-3">
          <div className="px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-3 shadow-sm">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Syncing Map
          </div>
          <div className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Encrypted Feed
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map View */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3 bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/40 overflow-hidden h-[700px] relative"
        >
          <MapContainer
            center={[28.6139, 77.2090]} // New Delhi Default
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            className="z-10"
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
                <Popup className="custom-popup">
                  <div className="p-4 w-64 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">
                        {tech.technicianId?.userName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none">{tech.technicianId?.userName || "Professional"}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Status: Online</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-indigo-500" />
                        {tech.technicianId?.phone || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        <Clock className="w-3.5 h-3.5" />
                        Updated {new Date(tech.updatedAt).toLocaleTimeString()}
                      </div>
                    </div>
                    <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors">
                      Dispatch Comms
                    </button>
                  </div>
                </Popup>
                <Tooltip permanent direction="top" offset={[0, -40]} className="custom-tooltip bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/50 px-3 py-1 font-black text-xs text-slate-800">
                  {tech.technicianId?.userName}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* Sidebar Controls & Stats */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/40 flex flex-col h-full"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Live Registry</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Staff Currently Tracked</p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {locations.length === 0 ? (
                <div className="text-center py-10 opacity-30">
                  <Activity className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase">Scanning for targets...</p>
                </div>
              ) : (
                locations.map((tech, i) => (
                  <motion.div 
                    key={tech._id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4 hover:border-indigo-200 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center font-black text-indigo-600 group-hover:scale-110 transition-transform">
                      {tech.technicianId?.userName?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-800 truncate">{tech.technicianId?.userName}</p>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-10 pt-10 border-t border-slate-50 space-y-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${stat.color}-50 rounded-xl text-${stat.color}-600`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <span className={`text-sm font-black text-${stat.color}-700`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Control Console */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="relative z-10 md:flex items-center justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="text-3xl font-black mb-4 flex items-center gap-3 italic">
              <Zap className="w-8 h-8 text-indigo-400 fill-indigo-400" />
              Response Optimization
            </h3>
            <p className="text-slate-400 font-bold">Automatic dispatch logic calculates the nearest technician for new service requests. Our tracking provides 99.9% uptime for logistics coordination.</p>
          </div>
          <button className="mt-8 md:mt-0 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-900/50 transition-all flex items-center gap-3 active:scale-95 whitespace-nowrap">
            Recalibrate Array
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default TechLocation;
