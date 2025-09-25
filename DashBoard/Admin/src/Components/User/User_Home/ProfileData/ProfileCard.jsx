import { User, Shield } from "lucide-react";
import EditProfile from "./EditProfile";

function ProfileCard({ getRoleColor, user, handleLogout }) {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>

          <div className="relative px-6 pb-6">
            <div className="flex items-center">
              <div className="relative -mt-16">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="ml-6 mt-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.userName}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                      user.userrole
                    )}`}
                  >
                    <Shield className="w-4 h-4 inline mr-1" />
                    {user.userrole}
                  </span>
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
