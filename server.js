import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";    

const app=express();

const PORT=process.env.PORT || 8000;
app.use(express.json())

app.get("/health",(req,res)=>{
    res.status(200).json({status:"success",massage:"server is running"})
})
app.use("/api/auth",authRoutes)

try{
    await connectDB()
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}catch(error){
    console.error("Error in server", error);
}