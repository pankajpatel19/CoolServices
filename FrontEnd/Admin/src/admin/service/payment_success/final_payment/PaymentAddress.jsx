import { MapPin, Phone } from "lucide-react";
function PaymentAddress({ addressData }) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Delivery Address
          </h2>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full uppercase font-medium">
              {addressData.addressType}
            </span>
          </div>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-1">
            <p className="font-semibold text-gray-800">
              {addressData.user.userName}
            </p>
            <p>{addressData.addressLine1}</p>
            {addressData.addressLine2 && <p>{addressData.addressLine2}</p>}
            <p>
              {addressData.city}, {addressData.state} - {addressData.zipCode}
            </p>
            <p>{addressData.country}</p>
            <p className="flex items-center gap-2 mt-2">
              <Phone className="w-4 h-4" />
              <span>{addressData.user.phone}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentAddress;
