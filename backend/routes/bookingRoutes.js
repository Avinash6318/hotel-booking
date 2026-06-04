import express from 'express';
import { checkAvailabilityApi, createBooking, getHotelBookings, getuserBookings } from '../controllers/bookingController.js';
import { protect } from '../configs/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityApi);
bookingRouter.post('/book',protect, createBooking);
bookingRouter.get('/user',protect, getuserBookings);
bookingRouter.get('/hotel',protect, getHotelBookings);

export default bookingRouter;
