import React from "react";
import { useNavigate } from "react-router-dom";

function ComplainBox() {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-4xl mb-5 font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Have An any Complaints
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <button
          onClick={() => navigate("/Home/complain")}
          className="bg-gradient-to-r from-red-600 to-red-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-100 hover:to-red-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Make a Complaints
        </button>
      </div>
    </div>
  );
}

export default ComplainBox;
