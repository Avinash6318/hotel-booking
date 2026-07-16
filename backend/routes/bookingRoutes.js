import express from 'express';
import { checkAvailabilityApi, createBooking, getHotelBookings, getuserBookings, stripePayment } from '../controllers/bookingController.js';
import { protect } from '../configs/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityApi);
bookingRouter.post('/book',protect, createBooking);
bookingRouter.get('/user',protect, getuserBookings);
bookingRouter.get('/hotel',protect, getHotelBookings);
bookingRouter.post('/stripe-payment', protect, stripePayment);
// bookingRouter.post('/stripe-payment', (req, res) => {
//     console.log("Stripe route reached");
//     res.json({ success: true });
// });

export default bookingRouter;
