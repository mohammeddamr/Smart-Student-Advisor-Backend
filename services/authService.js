import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken"
import { getUserModel } from "../utils/getUserModel.js";

export const registerStudent=async({firstName,lastName,email,password,studentId})=>{
    const student=await Student.create({
        firstName,lastName,email,password,studentId  
    })
    return {
        id:student._id,
        firstName:student.firstName,
        lastName:student.lastName,
        email:student.email,
        studentId:student.studentId
    };
}

export const loginUser=async({email,password,role})=>{
    const User=getUserModel(role)
    if(!User)
        return null;

    const user = await User.findOne({email}).select("+password")

    if(!user || !await user.comparePassword(password)|| !user.isActive){
        return null
    }
    if(!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS TOKEN SECRET is not defined in environment variables");
    }

    const accessToken =jwt.sign({userId:user._id,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m",algorithm:"HS256"})
    return {
        accessToken,
        user:{
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            role:user.role
        }
    }

}