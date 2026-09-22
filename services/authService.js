import Student from "../models/studentModel.js";

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