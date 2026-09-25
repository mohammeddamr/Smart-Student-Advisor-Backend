import Student from "../models/studentModel.js"
import Professor from "../models/professorModel.js"
import admin from "../models/adminModel.js"

export const getUserModel=(role)=>{
    switch(role){
        case "student":
            return Student;
        break;
        case "professor":
            return Professor;
        break;
        case "admin":
        case "superadmin":    
            return admin;
        break;
        default:
            return null
    }
}