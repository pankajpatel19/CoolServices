import axios from "axios";
import React, { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useHistoryData } from "../../../Contaxt/HistoryContaxt";

function History() {
  const { history, loading } = useHistoryData();

  const downloadReciept = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:1916/Home/history/${id}/pdf`,
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.log("PDF DownLoad Error");
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">
            Loading your booking history...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <button
        onClick={handleGoBack}
        className="group flex items-center mb-5 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        Go Back
      </button>
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-3">Booking History</h2>
        {/* <p className="text-blue-100 text-lg">History for: </p> */}
      </div>

      {history.length > 0 ? (
        <div className="space-y-6 h-30">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div
                className={
                  item.status == "Done"
                    ? "bg-gradient-to-r from-red-500 to-red-500 text-white px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                }
              >
                <h3 className="text-xl font-semibold mb-2 sm:mb-0">
                  {item.name}
                </h3>
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {item.date}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Appliance:
                    </span>
                    <span className="text-gray-900 ml-4">{item.appliance}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Company:
                    </span>
                    <span className="text-gray-900 ml-4">{item.company}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Issue:</span>
                    <span className="text-gray-900 ml-4">{item.issue}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="text-gray-900 ml-4">{item.phone}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Address:
                    </span>
                    <span className="text-gray-900 ml-4 text-right">
                      {item.address}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Pincode:
                    </span>
                    <span className="text-gray-900 ml-4">{item.pincode}</span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="font-semibold text-gray-700">Time:</span>
                    <span className="text-gray-900 ml-4">{item.time}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      IssueDate:
                    </span>
                    <span className="text-gray-900 ml-4">
                      {new Date(item.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="text-gray-900 ml-4">{item.status}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Technician:
                    </span>
                    <span className="text-gray-900 ml-4">
                      {item.technician}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => downloadReciept(item._id)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-200 mb-5 ml-5"
              >
                Download Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <div className="text-6xl mb-6 opacity-60">📋</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            No booking history found
          </h3>
          <p className="text-gray-500 text-lg">
            You haven't made any bookings yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default History;
