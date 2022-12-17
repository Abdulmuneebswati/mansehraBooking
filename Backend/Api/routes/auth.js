import express from "express";
const router = express.Router();
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import createError from "../middlewares/error.js";
import jwt from "jsonwebtoken";

//register user
router.post("/register", async(req,res,next)=>{
    try {
        const bcryptedPassword = await bcrypt.hash(req.body.password,12);
        const newUser = new User ({
            username:req.body.username,
            email:req.body.email,
            password:bcryptedPassword,
        });
        const user = await newUser.save();
        if (user) {
            res.status(200).json("User has been created")
        }
    } catch (error) {
        next(error)
    }
})

//login
router.post("/login", async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username});

        if (!user) {
            next(createError(500,"invalidCrecedentials"));
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if (!isMatch) {
            next(createError(500,"invalidCrecedentials"));
        }else{
            const token = await jwt.sign({id:user._id,isAdmin:user.isAdmin},"kjqhkudhkuHKUHdkuhukhedkkuhdkuhkuhdekeuhukhdhkudhKEUHDUHDUS")
            const {password,isAdmin,...otherDeatails} = user;
            res.cookie("accesstoken",token,{httpOnly:true}).status(200).json({...otherDeatails._doc});
        }
    } catch (error) {
        next(error)
    }
})

export default router;