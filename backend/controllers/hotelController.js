import Hotel from "../model/Hotel.js";
import User from "../model/User.js"

export const registerHotel = async(req,res)=>{
    try {
        const {name,address,contact,city}=req.body;
        const owner=req.user._id;

        //chech if user already registered(user owner ayyada leda ani chechcheyadaniki)
        const hotel= await Hotel.findOne({owner})
        if(hotel){
            return res.status(400).json({success:false, message:"hotel alreay registered"})
        }
        await Hotel.create({name,address,contact,city,owner});
        await User.findByIdAndUpdate(owner,{role:"hotelOwner"});
        
         return res.status(200).json({success:true, message:"hotel registered"})
    } catch (error) {
         return res.status(400).json({success:false, message:error.message})
    }
}