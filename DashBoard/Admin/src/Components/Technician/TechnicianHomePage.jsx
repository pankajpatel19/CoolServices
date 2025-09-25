import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function TechnicianHomePage() {
  const [technicianData, setTechnicianData] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setTechnicianData(user);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {technicianData.userName}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Technician Portal
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-lg">
              {technicianData.userName}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome Back!
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              Hello,{" "}
              <span className="font-semibold text-blue-600">
                {technicianData.userName}
              </span>
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Technician ID:</span>
                  <span className="font-semibold text-gray-800">
                    {technicianData._id}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Specialization:</span>
                  <span className="font-semibold text-gray-800">
                    {technicianData.userrole}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-semibold text-gray-800">
                    {technicianData.joinAt}
                  </span>
                </div>

                <hr className="border-gray-200" />

                <div className="text-center">
                  {/* <div className="text-2xl font-bold text-blue-600 mb-1">
                    {currentTime}
                  </div>
                  <div className="text-sm text-gray-600">{currentDate}</div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Status</h3>
              <p className="text-green-600 font-medium">Active</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Shift</h3>
              <p className="text-blue-600 font-medium">Day Shift</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Availability</h3>
              <p className="text-purple-600 font-medium">Available</p>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <p className="text-gray-600 mb-6">Ready to start your day?</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5">
              <Link
                to={`/techhome/getdata?username=${technicianData.userName}`}
              >
                View Dashboard
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          © 2024 Company Name. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default TechnicianHomePage;
