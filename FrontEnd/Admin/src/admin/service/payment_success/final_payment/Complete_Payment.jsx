import React from "react";
import { CheckCircle, Download, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Complete_Payment() {
  const navigate = useNavigate();
  const paymentDetails = {
    orderId: "ORD-2025-001234",
    amount: 350,
    paymentMethod: "UPI",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-sm text-gray-600">
            Your payment has been processed successfully
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Payment Details
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-medium text-gray-900">
                {paymentDetails.orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium text-gray-900">
                {paymentDetails.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium text-gray-900">
                {paymentDetails.date}, {paymentDetails.time}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-gray-900 font-semibold">Amount Paid</span>
              <span className="text-lg font-bold text-green-600">
                ₹{paymentDetails.amount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/Home")}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            A confirmation email has been sent to your registered email address
          </p>
        </div>
      </div>
    </div>
  );
}

export default Complete_Payment;
