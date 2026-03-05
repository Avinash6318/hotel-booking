import express from "express";
import upload from "../configs/uploadMiddleware.js";
import { protect } from "../configs/authMiddleware.js";
import { createRoom, getAllRooms, getOwnerRooms, toggleRoomAvailabiltiy } from "../controllers/roomController.js";

const roomRouter = express.Router();
roomRouter.post('/',upload.array("images",4), protect,createRoom)
roomRouter.get('/',getAllRooms)
roomRouter.get('/owner',protect,getOwnerRooms)
roomRouter.post('/toggle-availability',protect,toggleRoomAvailabiltiy)

export default roomRouter