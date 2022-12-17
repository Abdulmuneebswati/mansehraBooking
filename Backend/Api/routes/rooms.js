import express from "express";
import createError from "../middlewares/error.js";
import Room from "../model/room.js";
import Hotel from "../model/hotel.js"
import { verifyAdmin } from "../middlewares/verifyToken.js";
const router = express.Router();
//create
router.post("/:hotelid",verifyAdmin,async(req,res)=>{
    const hotelId = req.params.hotelid;
    const newRoom =  new Room (req.body);
    try {
        const savedRoom = await newRoom.save();
         try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}});
         } catch (error) {
        next(error)
         }
         res.status(200).json(savedRoom);
        } catch (error) {
        next(error)
    }
})

//update
router.put('/:id',verifyAdmin,async(req,res)=>{
    const id = req.params.id;
    try {
        const updateRoom = await Room.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json(updateRoom);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/',async(req,res,next)=>{
    try {
        const Rooms = await Room.find();
        res.status(200).json(Rooms);
    } catch (error) {
         next(error);
    }
})
//readOne
router.get('/:id',async(req,res,next)=>{
    const id = req.params.id
    try {
        const Room = await Room.findOne({id:id});
        res.status(200).json(Room);
    } catch (error) {
         next(error);
    }
})

//delete
router.delete('/:id/:hotelid',verifyAdmin,async(req,res)=>{
    const hotelId = req.params.hotelid;
    try {
        const deleteRoom = await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        } catch (error) {
            next(error);
        }
        res.status(200).send("Room has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
})






export default router;
