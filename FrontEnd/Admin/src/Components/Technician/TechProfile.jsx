import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Mail, Shield, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import EditProfile from "../User/User_Home/ProfileData/EditProfile";

function TechProfile() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      const User = JSON.parse(localStorage.getItem("user"));
      setUser(User);
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("LogOut SuccessFully");
    navigate("/login");
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(null);

  const changeImage = (e) => {
    setFile(e.target.files[0]);
  };
  const changeProfile = async () => {
    if (!file) {
      toast.error("Select Image First");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:1916/profile/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUpload(res.data.user.avatar);
      toast.success("Profile Changed");
    } catch (error) {
      toast.success(error);
    }
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
      <div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          toastClassName="!bg-white !border !border-gray-200 !shadow-lg !rounded-lg"
          bodyClassName="!text-sm !font-medium"
          progressClassName="!bg-blue-500"
        />
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Gradient */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24 sm:h-32"></div>

            <div className="relative px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="relative -mt-12 sm:-mt-16">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={user.avatar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center sm:text-left sm:ml-6 mt-2 sm:mt-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {user.userName}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1 break-all">
                    {user.email}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 sm:mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getRoleColor(
                        user.userrole
                      )}`}
                    >
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      {user.userrole}
                    </span>
                    <input
                      type="file"
                      className="flex items-center w-30 gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      placeholder="update Profile Image"
                      onChange={changeImage}
                    />
                    <button
                      onClick={changeProfile}
                      className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <EditProfile
            user={user}
            getRoleColor={getRoleColor}
            handleLogout={handleLogout}
          />
        </div>
      </div>
      <div className="m-15 bg-white rounded-lg shadow-md p-6">
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
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-2xl z-50">
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

            {/* <label className="block mb-3">
              <span className="text-gray-700 text-sm">avatar</span>
              <input
                type="file"
                name="avatar"
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.files })
                }
                className="w-full border p-2 rounded mt-1"
              />
            </label> */}

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

export default TechProfile;
