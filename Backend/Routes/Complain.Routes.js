import { Router } from "express";

import {
  SubmitComplaints,
  ShowComplaints,
} from "../Controller/Complain/complain.controller.js";
import userAuth from "../MiddleWare/UserAuth.middleware.js";
import validate from "../MiddleWare/Validate.middleware.js";
import { complaintSchema } from "../MiddleWare/Joi.middleware.js";

const router = Router();

router.post("/Home/Complaint", userAuth, validate(complaintSchema), SubmitComplaints);
router.get("/Home/Complaint/:id", userAuth, ShowComplaints);

export default router;
