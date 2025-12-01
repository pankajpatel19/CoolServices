import React, { useState, useEffect } from "react";
import {
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Wallet,
  CheckCircle,
} from "lucide-react";
import api from "../../../../Utils/axios";
import { useParams } from "react-router-dom";

function SelectedAddress() {
  // Simulating fetching data based on ID from useParams
  const { id } = useParams();
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [upiId, setUpiId] = useState("");

  const fetch_details = async () => {
    const data = await api.get(`/customer/payment_Details/${id}`);
    console.log(data);
  };

  useEffect(() => {
    // Simulate API call to fetch address and user data
    fetch_details();
    setTimeout(() => {
      setAddressData({
        address: {
          _id: "addr123",
          addressLine1: "123, Sunrise Apartments",
          addressLine2: "Near City Mall, SG Highway",
          city: "Ahmedabad",
          state: "Gujarat",
          zipCode: "380015",
          country: "India",
          addressType: "home",
        },
        user: {
          _id: "user123",
          userName: "Rajesh Kumar",
          email: "rajesh.kumar@example.com",
          phone: 9876543210,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
        },
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    if (selectedPayment === "upi" && !upiId) {
      alert("Please enter UPI ID");
      return;
    }
    alert(
      `Payment initiated via ${
        selectedPayment === "cash" ? "Cash on Delivery" : `UPI (${upiId})`
      }`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  const { address, user } = addressData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* User Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Customer Details
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={user.avatar}
              alt={user.userName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-indigo-100"
            />
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {user.userName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address Card */}
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
                {address.addressType}
              </span>
            </div>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-1">
              <p className="font-semibold text-gray-800">{user.userName}</p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>
                {address.city}, {address.state} - {address.zipCode}
              </p>
              <p>{address.country}</p>
              <p className="flex items-center gap-2 mt-2">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Payment Method
            </h2>
          </div>

          <div className="space-y-3">
            {/* Cash on Delivery */}
            <div
              onClick={() => setSelectedPayment("cash")}
              className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                selectedPayment === "cash"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      selectedPayment === "cash"
                        ? "bg-indigo-600"
                        : "bg-gray-100"
                    }`}
                  >
                    <Wallet
                      className={`w-6 h-6 ${
                        selectedPayment === "cash"
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-gray-600">
                      Pay when you receive
                    </p>
                  </div>
                </div>
                {selectedPayment === "cash" && (
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                )}
              </div>
            </div>

            {/* UPI Payment */}
            <div
              onClick={() => setSelectedPayment("upi")}
              className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                selectedPayment === "upi"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      selectedPayment === "upi"
                        ? "bg-indigo-600"
                        : "bg-gray-100"
                    }`}
                  >
                    <CreditCard
                      className={`w-6 h-6 ${
                        selectedPayment === "upi"
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">UPI Payment</h3>
                    <p className="text-sm text-gray-600">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </div>
                {selectedPayment === "upi" && (
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                )}
              </div>

              {selectedPayment === "upi" && (
                <div className="mt-3 pt-3 border-t border-indigo-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Proceed to Pay Button */}
          <button
            onClick={handlePayment}
            disabled={!selectedPayment}
            className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold transition transform ${
              selectedPayment
                ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedPayment === "cash"
              ? "Place Order (COD)"
              : "Proceed to Pay"}
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹1,299</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg">
              <span className="font-bold text-gray-800">Total Amount</span>
              <span className="font-bold text-indigo-600">₹1,299</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedAddress;
