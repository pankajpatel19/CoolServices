import express, { Router } from "express";
import {
  add_address,
  delete_address,
  PaymentDetails,
  show_address,
} from "../Controller/ServiceController/address.controller.js";
import validate from "../MiddleWare/Validate.middleware.js";
import { addressSchema } from "../MiddleWare/Joi.middleware.js";
import userAuth from "../MiddleWare/UserAuth.middleware.js";

const router = Router();
router.post("/add_address", userAuth, validate(addressSchema), add_address);
router.get("/show_address/:id", userAuth, show_address);
router.get("/payment_Details/:id", userAuth, PaymentDetails);

router.delete("/delete_address/:id", userAuth, delete_address);

export default router;
