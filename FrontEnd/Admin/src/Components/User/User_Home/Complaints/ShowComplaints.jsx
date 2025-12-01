import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../../Utils/axios";
import { useState } from "react";

function ShowComplaints() {
  const { id } = useParams();
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await api.get(`/Home/Complaint/${id}`);
      setComplaints(res.data.complaint);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Complaints Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            {complaints?.length || 0} total{" "}
            {complaints?.length === 1 ? "complaint" : "complaints"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {complaints?.map((data) => (
            <div
              key={data._id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-emerald-100 hover:border-emerald-300 p-6 sm:p-8 group"
            >
              <div className="flex items-start gap-4 mb-6 pb-6 border-b-2 border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {data.fullname.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 truncate">
                    {data.fullname}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p className="text-sm truncate">{data.email}</p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                    Subject
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 leading-snug">
                  {data.subject}
                </h4>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                    Message
                  </span>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-5 border-2 border-emerald-200 shadow-inner">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                    {data.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!complaints || complaints.length === 0) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border-2 border-emerald-100">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Complaints Found
            </h3>
            <p className="text-gray-600 text-lg">
              All clear! No complaints to display at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowComplaints;
