import crypto from "crypto";
import { razorpay } from "../../config/razorpay.config.js";
import Service from "../../Models/Services.model.js";
import Payment from "../../Models/Payment.model.js";

export const payment = async (req, res) => {
  try {
    const { amount, serviceId } = req.body;

    const service = await Service.findById(serviceId);
    const options = {
      amount: service.price * 100,
      currency: "INR",
      receipt: `reciept_${Date.now()}`,
      notes: { serviceId, user: 123 },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      service_id,
    } = req.body;

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    const newPayment = new Payment({
      user: req.user.id,
      service: service_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await newPayment.save();

    if (expectedSign === razorpay_signature) {
      return res
        .status(200)
        .json({ message: "Payment SuccessFull", success: true });
    } else {
      return res.status(400).json({ message: "failed", success: false });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during payment verification",
    });
  }
};
