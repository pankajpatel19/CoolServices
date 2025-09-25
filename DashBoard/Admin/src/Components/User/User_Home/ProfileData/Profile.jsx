import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Mail, Shield, Edit2 } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard";
import { useEffect } from "react";

function Profile() {
  const [edit, setEdit] = useState(false);
  const [User, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:1916/profile/${id}`);

      setUser(res.data.user);
    };
    fetchUser();
  }, [id, token]);

  useEffect(() => {
    if (User) {
      setFormData({
        userName: User.userName || "",
        email: User.email || "",
        phone: User.phone || "",
        location: User.location || "",
      });
    }
  }, [User]);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:1916/updateprofile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);
      setEdit(false);
    } catch (error) {
      console.log("Update Profile Error : ", error);
      toast.success("Error While Updating value");
    }
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:1916/logout", { withCredentials: true });
    localStorage.removeItem("user");
    toast.success("LogOut SuccessFully");
    navigate("/login");
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "technician":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <button
        onClick={handleGoBack}
        className="group flex items-center ml-10 mt-10 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        Go Back
      </button>
      <ProfileCard
        getRoleColor={getRoleColor}
        user={User}
        handleLogout={handleLogout}
      />

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setEdit(!edit)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <Edit2 className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Edit Profile</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Shield className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">
              Security Settings
            </p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Mail className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Notifications</p>
          </button>
        </div>
      </div>

      {edit && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            {/* Name */}
            <label className="block mb-3">
              <span className="text-gray-700 text-sm">Full Name</span>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            {/* Email */}
            <label className="block mb-3">
              <span className="text-gray-700 text-sm">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            {/* Phone */}
            <label className="block mb-3">
              <span className="text-gray-700 text-sm">Phone</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            {/* Location */}
            <label className="block mb-3">
              <span className="text-gray-700 text-sm">Location</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEdit(!edit)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
