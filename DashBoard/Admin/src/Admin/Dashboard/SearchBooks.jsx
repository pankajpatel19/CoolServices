import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SearchBooks({
  requestDate,
  getStatusColor,
  handledelete,
  updatebooking,
  updateTechnician,
}) {
  return (
    <div>
      {" "}
      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Service Requests
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage and track all service complaints
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requestDate.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/showbooking/${item._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                    >
                      {item.name}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.appliance}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.company}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.date}
                      </div>
                      <div className="text-sm text-gray-600">{item.time}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-mono">
                      {item.phone}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${getStatusColor(
                        item.status
                      )}`}
                      value={item.status}
                      onChange={(e) => updatebooking(item._id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                      <option value="cancel">Cancel</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${getStatusColor(
                        item.status
                      )}`}
                      value={item.technician}
                      onChange={(e) =>
                        updateTechnician(item._id, e.target.value)
                      }
                    >
                      <option value="ajay">ajay</option>
                      <option value="rohit">Rohit</option>
                      <option value="anuj">Anuj</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      onClick={() => handledelete(item._id)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {requestDate.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No bookings found
              </h3>
              <p className="mt-2 text-gray-600">
                Get started by creating your first service booking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBooks;
