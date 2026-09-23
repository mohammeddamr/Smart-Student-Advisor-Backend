import {registerStudent,loginStudent} from "../services/authService.js";


export const signup =async(req,res)=>{
    try{
        const{firstName,lastName,email,password,studentId}=req.body??{}
        const fields={firstName,lastName,email,password,studentId}
        for(const key in fields){
            const value=fields[key]
            if(typeof(value)!=="string" || !value.trim())
                return res.status(400).json({message:`${key} is required and must be a string`})
        }

        const normalizedEmail=email.toLowerCase().trim()
        const parts=normalizedEmail.split("@")

        const hasWhiteSpace=[...normalizedEmail].some(char=>char.trim().length===0)

        if(parts.length!==2 || !parts[0] || !parts[1] || hasWhiteSpace)
            return res.status(400).json({message:"Invalid email format"})

        if(password.length<8)
            return res.status(400).json({message:"Password must be at least 8 characters long"})  
  
        if (Buffer.byteLength(password, "utf8") > 72) 
            return res.status(400).json({message: "Password must not exceed 72 bytes, choose shorter one please",});

        const student =  await registerStudent({firstName,lastName,email : normalizedEmail,password,studentId})

        return res.status(201).json({message:"Student registered successfully",student})

    }catch(error){
        console.error("Signup failed:", error);

    return res.status(500).json({
      message: "Could not create account",
    });
    }
}

export const login=async(req,res)=>{
    try {const{email,password}=req.body??{}
        if(typeof(email)!=="string" || !email.trim()|| typeof(password)!=="string" ||password.length<8||Buffer.byteLength(password, "utf8") > 72){  
            return res.status(400).json({message:"Email and password are required and must be valid"})
        }

        const result=await loginStudent({email: email.toLowerCase().trim(),password})

        if(!result){
            return res.status(401).json({message:"Invalid email or password"})
        }

        return res.status(200).json({message:"Login successful",...result}

        )}
    catch(error){
        console.error("Login failed:", error);
        return res.status(500).json({message:"Could not login, please try again later"})    

}}

export const getProfile=async(req,res)=>{
    return res.status(200).json({student:{
        id:req.user._id,
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        email:req.user.email,
        studentId:req.user.studentId
    }})
}