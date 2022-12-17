import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const connect = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/reservation-app");
        console.log('connected');
    } catch (error) {
        throw error;
    }
}

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500 ;
    const errorMsg = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMsg,
        stack:err.stack,
    })

})

app.listen("5000",() =>{
    connect();
    console.log("successful");
})