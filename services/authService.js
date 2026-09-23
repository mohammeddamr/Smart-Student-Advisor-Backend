import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken"

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

export const loginStudent=async({email,password})=>{
    const student = await Student.findOne({email}).select("+password")

    if(!student || !await student.comparePassword(password)){
        return null
    }
    if(!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS TOKEN SECRET is not defined in environment variables");
    }

    const accessToken =jwt.sign({userId:student._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m",algorithm:"HS256"})
    return {
        accessToken,
        student:{
            id:student._id,
            firstName:student.firstName,
            lastName:student.lastName,
            email:student.email,
            studentId:student.studentId
        }
    }

}