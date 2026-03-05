import Hotel from "../model/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../model/Room.js";

//Api to create a new room
export const createRoom = async(req,res)=>{
    try {
        const{roomType,pricePerNight,amenities}=req.body;
        const hotel= await Hotel.findOne({owner:req.auth.userId})
        if(!hotel){
            return res.status(400).json({success:false, message:"hotel not registered"})
        }
        // upload hotel image using clouinary
        const uploaImage= req.files.map(async(file)=>{
            const response = cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        const images= await Promise.all(uploaImage)
        await Room.create({
            hotel:hotel._id,
            roomType,
            amenities:JSON.parse(amenities),
            images,
            pricePerNight : +pricePerNight,
        })

        res.status(200).json({success:true, message:"room created successfully"});
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
}


//Api to get all rooms 
export const getAllRooms = async(req,res)=>{
    try {
        const rooms = await Room.find({isAvailable:true}).populate({path:'hotel',
            populate:{path:'owner', select:'image'}
        }).sort({createdAt:-1})
        res.status(200).json({success:true, rooms});
    } catch (error) {

        res.status(400).json({success:false, message:error.message})   
    }
}


//Api to get all rooms of specific hotel
export const getOwnerRooms = async(req,res)=>{
    try {
        const hotelData =await Hotel({owner:req.auth.userId})
        const rooms= await Room.find({hotel:hotelData._id.tostring()}).populate("hotel");
        res.status(200).json({success:true,rooms});
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }
}


//Api to toggle availability of a room
export const toggleRoomAvailabiltiy = async(req,res)=>{
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable=!roomData.isAvailable;
        await roomData.save();
        res.status(200).json({success:true,message:'room availablity is toggled'});
    } catch (error) {
         res.status(400).json({success:false,message:error.message});
    }
}


