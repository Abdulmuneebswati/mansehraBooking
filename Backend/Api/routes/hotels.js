import express from "express";
import { verifyAdmin} from "../middlewares/verifyToken.js";
import Hotel from "../model/hotel.js"
const router = express.Router();
//Crud

router.post('/',verifyAdmin,async(req,res)=>{
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (error) {
        res.status(500).json(error);
    }
})

//update
router.put('/:id',verifyAdmin,async(req,res)=>{
    const id = req.params.id;
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json(updateHotel);
    } catch (error) {
        res.status(500).json(error);
    }
})
//read
router.get('/',async(req,res,next)=>{
    const {min,max,...others} = req.query;
    try {
        const Hotels = await Hotel.find({...others,cheapestPrice:{$gt:min || 1,$lt:max || 12000}}).limit(req.query.limit);
        res.status(200).json(Hotels);
    } catch (error) {
         next(error);
    }
})
//readOne
router.get('/find/:id',async(req,res,next)=>{
    const id = req.params.id
    try {
        const Hotels = await Hotel.findOne({id:id});
        res.status(200).json(Hotels);
    } catch (error) {
         next(error);
    }
})


//delete
router.delete('/:id',verifyAdmin,async(req,res)=>{
    const id = req.params.id;
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(id);
        res.status(200).json(deleteHotel);
    } catch (error) {
        res.status(500).json(error);
    }
})


router.get('/countByCity',async(req,res,next)=>{
  const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city});
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error);
    }
})

router.get('/countByType',async(req,res,next)=>{
    

    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
    const apartmentCount = await Hotel.countDocuments({type:"apartment"});
    const resortCount = await Hotel.countDocuments({type:"resort"});
    const villaCount = await Hotel.countDocuments({type:"villa"});
    const cabinCount = await Hotel.countDocuments({type:"cabin"});
    res.status(200).json([
        {type:"hotel",count:hotelCount},
        {type:"apartment",count:apartmentCount},
        {type:"resort",count:resortCount},
        {type:"villa",count:villaCount},
        {type:"cabin",count:cabinCount}
    ])
    } catch (error) {
        next(err);
    }
})





export default router;