import {
  User,
  Mail,
  Phone,
  Calendar,
  Users as UsersIcon,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Users({ users, formatDate }) {
  const navigate = useNavigate();

  const showComplains = (id) => {
    navigate(`/admin/userComplain/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Our Customers</h1>
          </div>
          <p className="text-gray-600">Total users: {users.length}</p>
        </div>

        {/* Users List */}
        {users.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No users found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Header with gradient */}
                <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                  <div className="absolute -bottom-10 left-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-12 px-6 pb-6">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {user.userName}
                  </h3>

                  {/* User Details */}
                  <div className="space-y-3 mb-4">
                    {/* Email */}
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-medium mb-0.5">
                          Email
                        </p>
                        <p className="text-sm font-medium truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-0.5">
                          Phone
                        </p>
                        <p className="text-sm font-medium">{user.phone}</p>
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-0.5">
                          Joined
                        </p>
                        <p className="text-sm font-medium">
                          {formatDate(user.joinAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Show Complaints Button */}
                  <button
                    onClick={() => showComplains(user._id)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4" />
                    View Complaints
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
                  <p className="text-xs text-gray-500 text-center">
                    User ID: {user._id.slice(-8)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
