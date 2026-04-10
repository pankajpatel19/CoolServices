import React from "react";
import { Clock, Tag, Star, Wrench, CheckCircle } from "lucide-react";

function PaymentService({ service }) {
  console.log(service);

  return (
    <>
      <div className="max-w-5xl mx-auto p-4">
        <div className="border border-gray-300 rounded p-6">
          {/* Header */}
          <div className="border-b pb-3 mb-3">
            <h1 className="text-lg font-bold">Order Summary</h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Service Info */}
            <div>
              <h2 className="text-base font-semibold mb-1">{service.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {service.description}
              </p>
              <div className="text-sm mb-4">
                <span className="font-medium">Rating:</span> {service.rating} ⭐
              </div>

              {/* Details Table */}
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Appliance</td>
                    <td className="py-2 font-medium">{service.appliance}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Service Type</td>
                    <td className="py-2 font-medium">{service.serviceType}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Duration</td>
                    <td className="py-2 font-medium">{service.duration}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Tools Used</td>
                    <td className="py-2 font-medium">
                      {service.toolsUsed} items
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Items Included</td>
                    <td className="py-2 font-medium">
                      {service.includedItems} items
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Column - Payment & Actions */}
            <div>
              {/* Payment */}
              <div className="bg-gray-50 p-4 rounded mb-4">
                <h3 className="font-semibold mb-3">Payment Summary</h3>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Service Charge</span>
                  <span className="font-medium">₹{service.price}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg">₹{service.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t text-xs text-gray-500 text-center">
            Order created: {new Date(service.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentService;
