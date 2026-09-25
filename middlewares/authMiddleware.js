import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {getUserModel} from "../utils/getUserModel.js" 

export const protectRoute=async(req,res,next)=>{
    try{
        const authorization=req.get("Authorization")
        if(!authorization)
            return res.status(401).json({status:"fail",message:"access token missing"})

        const[scheme,token,extra]=authorization.trim().split(" ")

        if(scheme.toLowerCase()!=="bearer" || !token || extra)
            return res.status(401).json({status:"fail",message:"invalid authorization header format"})

        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new Error("ACCESS TOKEN SECRET is not defined in environment variables");
        }

        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{algorithms:["HS256"]})

        if(!mongoose.isObjectIdOrHexString(decoded.userId))
            return res.status(401).json({status:"fail",message:"invalid access token"})

        const User=  getUserModel(decoded.role)

        if(!User){
            return res.status(401).json({message:"invalid access token"})
        }

        const user=await User.findById(decoded.userId).select("-password")

        if(!user || !user.isActive)
            return res.status(401).json({status:"fail",message:"user not avilable"})

        req.user=user

    }catch(error){
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
              message: "Access token has expired. Please log in again",
            });
          }
      
          if (
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
          ) {
            return res.status(401).json({
              message: "Invalid access token",
            });
          }
      
          console.error("Authentication failed:", error.name);
      
          return res.status(500).json({
            message: "Could not authenticate request",
          });
        }
      
  return next();
}
