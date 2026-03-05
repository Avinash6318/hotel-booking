import express from "express"
import { protect } from "../configs/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";


const hotelRouter= express.Router();

hotelRouter.post("/",protect,registerHotel);


export default hotelRouter