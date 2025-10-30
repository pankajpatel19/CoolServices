import { Router } from "express";
import userAuth from "../MiddleWare/UserAuth.middleware.js";
import {
  addService,
  getServicesByAppliance,
} from "../Controller/ServiceController/service.controller.js";
const router = Router();

router.get("/appliance", getServicesByAppliance);
router.post("/add", userAuth, addService);

export default router;
