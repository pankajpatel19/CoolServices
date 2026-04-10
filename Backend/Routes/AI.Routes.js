import validate from "../MiddleWare/Validate.middleware.js";
import { aiQuerySchema } from "../MiddleWare/Joi.middleware.js";
import { Router } from "express";
import userAuth from "../MiddleWare/UserAuth.middleware.js";
import { getAIResponse } from "../Controller/User/ai.controller.js";

const router = Router();

router.post("/chat", userAuth, validate(aiQuerySchema), getAIResponse);

export default router;
