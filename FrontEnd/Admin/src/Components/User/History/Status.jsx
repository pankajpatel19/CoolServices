import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

function Status({ status, changeStatus }) {
  return (
    <>
      <div className="w-full max-w-md mb-5 ml-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          Update Status
        </label>
        <div className="relative">
          <select
            name="status"
            id="status"
            value={status}
            onChange={changeStatus}
            className="w-full appearance-none bg-white border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl px-4 py-3.5 pr-12 text-gray-800 font-medium cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="all">🆕 All</option>
            <option value="New">🆕 New</option>
            <option value="In Progress">⚙️ In Progress</option>
            <option value="Done">✅ Done</option>
          </select>

          {/* Custom Dropdown Arrow */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Status Indicator */}
        {status && (
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                status === "New"
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : status === "In Progress"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : status === "Done"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              Current: {status}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default Status;
