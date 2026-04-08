import { Router } from "express";
import { payment, verifyPayment } from "../Controller/payment/razorpay.controller.js";
import userAuth from "../MiddleWare/UserAuth.middleware.js";

const router = Router();

router.post("/create-order", userAuth, payment);
router.post("/verify-order", userAuth, verifyPayment);

export default router;
