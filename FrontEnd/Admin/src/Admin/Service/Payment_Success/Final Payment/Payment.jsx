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
import { useParams } from "react-router-dom";
import api from "../../../../../Utils/axios";

function Payment() {
  // Simulating fetching data based on ID from useParams
  const { id } = useParams();
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [upiId, setUpiId] = useState("");

  const fetch_details = async () => {
    const { data } = await api.get(`/customer/payment_Details/${id}`);
    setAddressData(data.details);
  };

  useEffect(() => {
    // Simulate API call to fetch address and user data
    fetch_details();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    if (selectedPayment === "upi") {
      // handlePaymentWthRazorPay();
      return;
    }
    alert(
      `Payment initiated via ${
        selectedPayment === "cash" ? "Cash on Delivery" : `UPI (${upiId})`
      }`
    );
  };
  const handlePaymentWthRazorPay = async (service) => {
    try {
      const { data: order } = await api.post("/create-order", {
        amount: service.price,
        serviceId: service._id,
      });

      const option = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CoolServices",
        description: "Payment for Service",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verify = await api.post("/verify-order", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              service_id: services._id,
            });

            if (verify.data.success) {
              toast.success("✅ Payment successful! Note unlocked.");
              navigate("/Home/Complete_Payment");
              return;
            } else {
              toast.error("❌ Payment verification failed!");
            }
          } catch (error) {
            console.log("catch");
            toast.error("❌ Payment verification failed!");
          }
        },
        prefill: {
          name: localStorage.getItem("name") || "",
          email: localStorage.getItem("email") || "",
        },
        theme: { color: "#7e22ce" },
      };

      const rzp = new window.Razorpay(option);

      rzp.on("payment.failed", function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.log("Error", error);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

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
                <div className="mt-3 pt-3 border-t border-indigo-200"></div>
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

export default Payment;
