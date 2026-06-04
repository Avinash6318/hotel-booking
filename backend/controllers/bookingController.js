import Booking from "../model/Booking.js"
import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

//Function to chech availability of the room 
const checkAvailability= async({checkInDate, checkOutDate,room})=>{
    try {
        const bookings= await Booking.find({room,checkInDate:{$lte:checkOutDate},checkOutDate:{$gte:checkInDate}})

        const isAvailable = bookings.length===0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}

//Api to check availability of room
//POST/api/bookings/check-availability
export const checkAvailabilityApi=async(req,res)=>{
    try {
        const{room,checkInDate,checkOutDate}=req.body;
        const isAvailable=await checkAvailability({room,checkInDate,checkOutDate});
        res.status(200).json({success:true,isAvailable})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

//Api to create a new booking 
//post/api/bookings/book
export const createBooking= async(req,res)=>{
    try {
        const{room,checkInDate,checkOutDate,guests}=req.body;
        const user=req.user._id;

        //before booking check availability
        const isAvailable= await checkAvailability({room,checkInDate,checkOutDate});
        if(!isAvailable){
            return res.status(400).json({success:false,message:"room is not available"})
        }

        //get totalprice from room
        const roomData=await Room.findById(room).populate("hotel");
        let totalPrice= roomData.pricePerNight;

        //calculate total price based on nights
        const checkIn= new Date(checkInDate)
        const checkOut= new Date(checkOutDate)
        const timeDifference= checkOut.getTime()-checkIn.getTime();
        const nights=Math.ceil(timeDifference/(1000*3600*24));
        totalPrice*=nights;
        const booking= await Booking.create({user,room,hotel:roomData.hotel._id, guests:+guests,
            checkInDate,checkOutDate,totalPrice
        })
        res.status(200).json({success:true,message:"booking created successfully"})
        
    } catch (error) {
        console.error(error)
         res.status(400).json({success:false,message:error.message})
    }
}

//Api to get all bookings for a user
//Get/api/bookings/user
export const getuserBookings= async(req,res)=>{
    try {
        const user = req.user._id;
        const bookings= (await Booking.find({user}).populate("room hotel")).sort({createdAt:-1})
        res.status(200).json({success:true,bookings})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

export const getHotelBookings= async (req,res) => {
   try {
     const hotel = await Hotel.findOne({owner: req.auth.userId});
    if(!hotel){
        return  res.json({success : false, message: "No Hotel Found"});
    }

    const bookings = (await Booking.find({hotel: hotel._id}).populate("room hotel user")).sort({createdAt : -1});

    //Total bookins
    const totalBookings = bookings.length;
    // Total Revenue
    const totalRevenue = bookings.reduce((acc,booking)=> acc + booking.totalPrice,0)

    res.status(200).json({success:true, dashboardData: {totalBookings, totalRevenue, bookings}})
    
   } catch (error) {
       res.status(400).json({success:false,message:"failed to fetch bookings"})
   }
}