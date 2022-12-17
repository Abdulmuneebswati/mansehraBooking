import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../middlewares/verifyToken.js";
import User from "../model/user.js"
const router = express.Router();
//Crud
router.post('/',async(req,res)=>{
    const newUser = new User(req.body);
    try {
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

//update
router.put('/:id',verifyUser,async(req,res)=>{
    const id = req.params.id;
    try {
        const updateUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }
})
//read
router.get('/',verifyAdmin,async(req,res,next)=>{
    try {
        const Users = await User.find();
        res.status(200).json(Users);
    } catch (error) {
         next(error);
    }
})
//read one
router.get('/:id',verifyUser,async(req,res,next)=>{
    const id = req.params.id;
    try {
        const Users = await User.findOne({id:id});
        res.status(200).json(Users);
    } catch (error) {
         next(error);
    }
})



//delete
router.delete('/:id',verifyUser,async(req,res)=>{
    const id = req.params.id;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(500).json(error);
    }
})










export default router;