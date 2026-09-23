import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    studentId:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    }

},{timestamps:true})

studentSchema.pre("save",async function(){
    if(!this.isModified("password"))
        return;

    if (Buffer.byteLength(this.password, "utf8") > 72) {
        throw new Error("Password must not exceed 72 bytes");
    }
    this.password=await bcrypt.hash(this.password,12)
})

studentSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}

const Student=mongoose.model("Student",studentSchema)
export default Student;
