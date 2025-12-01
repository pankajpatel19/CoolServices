import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: { type: String, required: true },
  },
  { timeseries: true, timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
