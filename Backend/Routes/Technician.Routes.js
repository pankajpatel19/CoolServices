import { Router } from "express";
import userAuth from "../MiddleWare/UserAuth.middleware.js";
import {
  handleTech,
  deleteTech,
  UpdateTechnician,
  updateLocation,
  getAllLocations,
} from "../Controller/Technician/TechnicianData.controller.js";
import {
  techniciandata,
  getTechnician,
  TechStatusBooking,
} from "../Controller/Technician/technician.controller.js";
const router = Router();

router.get("/handleTechnician", userAuth, handleTech);

router.patch("/updateTechnician/:id", userAuth, UpdateTechnician);

router.get("/techhome/getdata", userAuth, techniciandata);

router.delete("/handleTechnician/:id", userAuth, deleteTech);

router.post("/technician/update-location", userAuth, updateLocation);

router.get("/admin/technicians-locations", userAuth, getAllLocations);

router.get("/Techprofile", userAuth, getTechnician);

router.get("/status", userAuth, TechStatusBooking);
export default router;
