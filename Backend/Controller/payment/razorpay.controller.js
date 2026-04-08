import crypto from "crypto";
import { razorpay } from "../../config/razorpay.config.js";
import Service from "../../Models/Services.model.js";
import Payment from "../../Models/Payment.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const payment = async (req, res, next) => {
  try {
    const { amount, serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json(new ApiResponse(400, null, "Service ID is required"));
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json(new ApiResponse(404, null, "Service not found"));
    }

    const options = {
      amount: service.price * 100, // Amount is in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { 
        serviceId, 
        userId: req.user?._id || req.user?.id 
      },
    };

    const order = await razorpay.orders.create(options);
    
    return res.status(200).json(new ApiResponse(200, order, "Order created successfully"));
  } catch (error) {
    console.error("[Razorpay] Order creation failed:", error);
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      service_id,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json(new ApiResponse(400, null, "Missing payment verification details"));
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json(new ApiResponse(400, null, "Invalid payment signature"));
    }

    const newPayment = await Payment.create({
      user: req.user?._id || req.user?.id,
      service: service_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return res.status(200).json(
      new ApiResponse(200, newPayment, "Payment verified and recorded successfully")
    );
  } catch (error) {
    console.error("[Razorpay] Verification failed:", error);
    next(error);
  }
};
