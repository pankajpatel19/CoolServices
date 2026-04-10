import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Shield,
  Edit2,
  Phone,
  MapPin,
  LogOut,
  Camera,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "../user/user_home/profile_data/EditProfile";
import api from "../../utils/axios";

function TechProfile() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        userName: storedUser.userName || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        location: storedUser.location || "",
      });
    }
    setIsLoading(false);
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleUpdate = async () => {
    try {
      const res = await api.patch("/updateprofile", formData);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setEdit(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await api.get("/logout", { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const [file, setFile] = useState(null);

  const changeImage = (e) => {
    setFile(e.target.files[0]);
  };

  const changeProfile = async () => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await api.post("/profile/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile picture updated");
    } catch (error) {
      console.error("Profile upload error:", error);
      toast.error("Failed to upload profile picture");
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "technician":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "customer":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans pb-20">
      <ToastContainer
        position="top-center"
        toastClassName="backdrop-blur-md shadow-2xl rounded-2xl"
        bodyClassName="font-bold"
      />

      {/* Aesthetic Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-5xl mx-auto px-4 py-10"
      >
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-xl text-slate-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40 hover:-translate-x-1"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </motion.div>

      <main className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Cover Area */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-8 pb-12">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8 -mt-20">
              {/* Profile Image Section */}
              <div className="relative group">
                <div className="w-40 h-40 bg-white rounded-3xl p-1.5 shadow-2xl border border-white/50">
                  <div className="w-full h-full bg-slate-100 rounded-[1.25rem] overflow-hidden flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-slate-300" />
                    )}
                  </div>
                </div>
                <label className="absolute bottom-3 right-3 p-3 bg-blue-600 text-white rounded-2xl shadow-xl cursor-pointer hover:bg-blue-700 hover:scale-110 transition-all border-4 border-white">
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={changeImage}
                  />
                </label>
              </div>

              {/* Identity Section */}
              <div className="text-center md:text-left flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    {user.userName}
                  </h1>
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-widest ${getRoleColor(user.userrole)}`}
                  >
                    <Shield className="w-4 h-4 inline mr-1.5" />
                    {user.userrole}
                  </span>
                </div>
                <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                {file && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={changeProfile}
                    className="mt-2 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors uppercase tracking-widest"
                  >
                    Confirm New Image
                  </motion.button>
                )}
              </div>

              {/* Action Area */}
              <div className="flex gap-3">
                <button
                  onClick={() => setEdit(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors border border-red-100"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: user.phone || "Not Set",
                  color: "blue",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: user.location || "Not Set",
                  color: "indigo",
                },
                {
                  icon: Shield,
                  label: "Joined",
                  value: user.joinAt || "Dec 2023",
                  color: "purple",
                },
              ].map((info, i) => (
                <div
                  key={i}
                  className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-colors"
                >
                  <div
                    className={`w-12 h-12 bg-${info.color}-100 rounded-2xl flex items-center justify-center text-${info.color}-600 mb-4 shadow-inner`}
                  >
                    <info.icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                    {info.label}
                  </p>
                  <p className="text-lg font-black text-slate-800">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Sub-Components */}
            <div className="mt-12 pt-12 border-t border-slate-100">
              <EditProfile
                user={user}
                getRoleColor={getRoleColor}
                handleLogout={handleLogout}
              />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {edit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEdit(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <h2 className="text-2xl font-black">Update Information</h2>
                <p className="text-blue-100 font-medium">
                  Keep your profile fresh and accurate.
                </p>
              </div>

              <div className="p-8 space-y-6">
                {[
                  { id: "userName", label: "Full Name", icon: User },
                  {
                    id: "email",
                    label: "Email Address",
                    icon: Mail,
                    type: "email",
                  },
                  { id: "phone", label: "Phone Number", icon: Phone },
                  { id: "location", label: "Work Location", icon: MapPin },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      {field.label}
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <field.icon className="w-5 h-5" />
                      </div>
                      <input
                        type={field.type || "text"}
                        value={formData[field.id]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.id]: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-slate-700 transition-all"
                      />
                    </div>
                  </div>
                ))}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setEdit(false)}
                    className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex-3 px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TechProfile;
