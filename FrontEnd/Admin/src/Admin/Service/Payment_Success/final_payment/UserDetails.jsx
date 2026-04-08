import React from "react";
import { User, Mail, Phone } from "lucide-react";

function UserDetails({ addressData }) {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Customer Details
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <img
            src={addressData.user.avatar}
            alt={addressData.userName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-indigo-100"
          />
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              {addressData.user.userName}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Mail className="w-4 h-4" />
              <span>{addressData.user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Phone className="w-4 h-4" />
              <span>{addressData.user.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
