import React from "react";
import { useHistoryData } from "../../../Contaxt/HistoryContaxt";

function Upcoming() {
  const { history, loading } = useHistoryData();
  console.log(history);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (loading)
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3 text-gray-600">Loading upcoming bookings...</p>
      </div>
    );

  if (!history || history.length === 0)
    return (
      <div className="text-center p-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      </div>
    );

  // Filter upcoming bookings
  const upcomingBookings = history.filter((booking) => {
    if (!booking.issueDate) return false;
    const bookingDate = new Date(booking.issueDate);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  });

  // Sort by date ascending
  const upcomingBookingsSorted = upcomingBookings.sort(
    (a, b) => new Date(a.issueDate) - new Date(b.issueDate)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Upcoming Bookings
        </h2>
        <p className="text-gray-600">
          Manage and track your future appointments
        </p>
      </div>

      {upcomingBookingsSorted.length > 0 ? (
        <div className="space-y-4">
          {/* Stats Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold opacity-90">
                  Total Upcoming
                </h3>
                <p className="text-3xl font-bold">
                  {upcomingBookingsSorted.length}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="grid gap-4">
            {upcomingBookingsSorted.map((booking, index) => {
              const bookingDate = new Date(booking.issueDate);
              const isToday =
                bookingDate.toDateString() === new Date().toDateString();
              const isTomorrow =
                bookingDate.toDateString() ===
                new Date(Date.now() + 86400000).toDateString();

              return (
                <div
                  key={booking._id}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isToday
                      ? "border-red-200 bg-red-50 hover:shadow-red-100"
                      : isTomorrow
                      ? "border-amber-200 bg-amber-50 hover:shadow-amber-100"
                      : "border-gray-200 bg-white hover:shadow-gray-200"
                  }`}
                >
                  {/* Status indicator */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${
                      isToday
                        ? "bg-red-500"
                        : isTomorrow
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  ></div>

                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {booking.issue}
                        </h3>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                          {booking.appliance}
                        </h3>

                        <div className="flex items-center text-gray-600 mb-3">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-9 8v5a2 2 0 002 2h8a2 2 0 002-2v-5m-9 0V9a2 2 0 012-2h4a2 2 0 012 2v6.1"
                            />
                          </svg>
                          <span className="font-medium">
                            {bookingDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Time indicators */}
                        <div className="flex items-center space-x-4 text-sm">
                          {isToday && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Today
                            </span>
                          )}
                          {isTomorrow && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Tomorrow
                            </span>
                          )}
                          {!isToday && !isTomorrow && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Booking number */}
                      <div className="text-right">
                        <div className="text-sm text-gray-500 font-medium">
                          Booking #{index + 1}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative pattern */}
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 opacity-10">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                    >
                      <circle cx="50" cy="50" r="40" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center p-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-9 8v5a2 2 0 002 2h8a2 2 0 002-2v-5m-9 0V9a2 2 0 012-2h4a2 2 0 012 2v6.1"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No upcoming bookings
            </h3>
            <p className="text-gray-600 mb-4">
              You're all caught up! Check back later for new appointments.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              <svg
                className="w-4 h-4 mr-2"
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
              Schedule New Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upcoming;
