import React from "react";
import { Lock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Unauthorized() {
  const [userdt, setUserdt] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserdt(user);
  }, []);

  const handleLogout = async () => {
    await axios.get("https://coolservices.onrender.com/logout", {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    toast.success("LogOut SuccessFully");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>

        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-700">
            Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Go Back
          </button>
          {userdt.userrole == "technician" ? (
            <button
              onClick={() => (window.location.href = "/techhome")}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Return to Home
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Return to Home
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
