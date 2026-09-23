import express from "express";

import {signup,login,getProfile} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/profile",protectRoute,getProfile)

export default router