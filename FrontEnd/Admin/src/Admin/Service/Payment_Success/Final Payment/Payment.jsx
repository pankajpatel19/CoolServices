import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { User, Phone, Mail } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../../Utils/axios";
import { serviceContext } from "../../../../Contaxt/SetServiceContext";
import PaymentAddress from "./PaymentAddress";
import PaymentService from "./PaymentService";
import PaymentOption from "./PaymentOption";
import UserDetails from "./UserDetails";

function Payment() {
  // Simulating fetching data based on ID from useParams
  const { id } = useParams();
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [upiId, setUpiId] = useState("");
  const { service } = useContext(serviceContext);
  const navigate = useNavigate();

  const fetch_details = async () => {
    const { data } = await api.get(`/customer/payment_Details/${id}`);
    setAddressData(data.details);
  };

  const handlePayment = (service) => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    if (selectedPayment === "upi") {
      handlePaymentWthRazorPay(service);
      return;
    }
    if (selectedPayment === "cash") {
      toast.success("Service booking SuccessFully");
    }
    toast.success(
      `Payment initiated via ${
        selectedPayment === "cash" ? "Cash on Delivery" : `UPI (${upiId})`
      }`
    );
  };

  useEffect(() => {
    // Simulate API call to fetch address and user data
    fetch_details();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
              service_id: service._id,
            });

            if (verify.data.success) {
              toast.success("✅ Payment successful! Note unlocked.");
              navigate("/Home/Complete_Payment");
              return;
            } else {
              toast.error("❌ Payment verification failed!");
            }
          } catch (error) {
            console.log(error.message);
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
        <ToastContainer />
        {/* User Details Card */}
        <UserDetails addressData={addressData} />
        {/* Delivery Address Card */}
        <PaymentAddress addressData={addressData} />

        {/* Order Summary */}
        <PaymentService service={service} />

        {/* Payment Method Card */}
        <PaymentOption
          setSelectedPayment={setSelectedPayment}
          handlePayment={handlePayment}
          selectedPayment={selectedPayment}
        />
      </div>
    </div>
  );
}

export default Payment;
