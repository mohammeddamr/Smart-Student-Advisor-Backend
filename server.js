import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app=express();

const PORT=process.env.PORT || 8000;

app.get("/health",(req,res)=>{
    res.status(200).json({status:"success",massage:"server is running"})
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


