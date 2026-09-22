import {registerStudent} from "../services/authService.js";


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