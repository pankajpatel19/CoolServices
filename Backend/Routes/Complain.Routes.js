import { Router } from "express";

import {
  SubmitComplaints,
  ShowComplaints,
} from "../Controller/Complain/complain.controller.js";
import userAuth from "../MiddleWare/UserAuth.middleware.js";
const router = Router();

router.post("/Home/Complaint", userAuth, SubmitComplaints);
router.get("/Home/Complaint/:id", userAuth, ShowComplaints);

export default router;
