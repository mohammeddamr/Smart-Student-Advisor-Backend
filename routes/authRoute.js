import express from "express";

import {signup,login,getProfile} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import{authorize} from "../middlewares/authorize.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/profile",protectRoute,getProfile)
router.get("/admin-test",protectRoute,authorize("admin","superadmin"),(req,res)=>{
    return res.status(200).json({message:"you are authrized to access this resource"})
})
export default router