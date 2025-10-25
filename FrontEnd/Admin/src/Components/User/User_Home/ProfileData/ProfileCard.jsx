import { Shield } from "lucide-react";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function ProfileCard({ getRoleColor, user, handleLogout }) {
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
        "https://coolservices.onrender.com/profile/upload",
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

  return (
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
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <div className="w-full h-full bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeImage}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 shadow-lg"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </label>
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
  );
}

export default ProfileCard;
