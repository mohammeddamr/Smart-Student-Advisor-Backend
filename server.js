import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

const app=express();

const PORT=process.env.PORT || 8000;

app.get("/health",(req,res)=>{
    res.status(200).json({status:"success",massage:"server is running"})
})

try{
    await connectDB()
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}catch(error){
    console.error("Error in server", error);
}