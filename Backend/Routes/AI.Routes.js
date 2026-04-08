import { Router } from "express";
import { getAIResponse } from "../Controller/User/ai.controller.js";
import userAuth from "../MiddleWare/UserAuth.middleware.js";

const router = Router();

router.post("/chat", userAuth, getAIResponse);

export default router;
