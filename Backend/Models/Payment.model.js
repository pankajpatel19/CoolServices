import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema({});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
