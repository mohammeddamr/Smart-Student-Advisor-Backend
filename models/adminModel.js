import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const adminSchema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true,
    },
    lastName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:8,
    },
    role:{
        type:String,
        enum:["admin","superadmin"],
        default:"admin"
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

adminSchema.pre("save",async function(){
    if(!this.isModified("password"))
        return;

    if(Buffer.byteLength(this.password,"utf8")>72){
        throw new Error("Password must not exceed 72 bytes");
    }
    this.password=await bcrypt.hash(this.password,12)
})

adminSchema.methods.comparePassword=async function (password){
    return bcrypt.compare(password,this.password)
}


const Admin=mongoose.model("Admin",adminSchema)
export default Admin