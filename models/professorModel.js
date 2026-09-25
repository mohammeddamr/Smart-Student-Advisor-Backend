import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const professorSchema = new mongoose.Schema({
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
        unique:true,
        lowercase:true,
        trim:true
    },
    department:{
        type:String,
        trim:true,
        default:"",
    },
    title:{
        type:String,
        trim:true,
        default:"",
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:8
    },
    role:{
        type:String,
        enum:["professor"],
        default:"professor"
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

professorSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return;
    }
    if(Buffer.byteLength(this.password,"utf8")>72){
        throw new Error("Password must not exceed 72 bytes");
    }
    this.password=await bcrypt.hash(this.password,12)

})

professorSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}

const Professor=mongoose.model("Professor",professorSchema)
export default Professor;