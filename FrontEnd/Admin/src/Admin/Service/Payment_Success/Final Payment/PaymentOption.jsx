import { CreditCard, Wallet, CheckCircle } from "lucide-react";
import { serviceContext } from "../../../../Contaxt/SetServiceContext";
import { useContext } from "react";

function PaymentOption({ setSelectedPayment, selectedPayment, handlePayment }) {
  const { service } = useContext(serviceContext);

  return (
    <>
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
                    selectedPayment === "cash" ? "bg-indigo-600" : "bg-gray-100"
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
                  <p className="text-sm text-gray-600">Pay when you receive</p>
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
                    selectedPayment === "upi" ? "bg-indigo-600" : "bg-gray-100"
                  }`}
                >
                  <CreditCard
                    className={`w-6 h-6 ${
                      selectedPayment === "upi" ? "text-white" : "text-gray-600"
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
          onClick={() => handlePayment(service)}
          disabled={!selectedPayment}
          className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold transition transform ${
            selectedPayment
              ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {selectedPayment === "cash" ? "Place Order (COD)" : "Proceed to Pay"}
        </button>
      </div>
    </>
  );
}

export default PaymentOption;
