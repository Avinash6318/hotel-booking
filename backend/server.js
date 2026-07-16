import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import connectDB from './configs/db.js'
import clerkWebhooks from './controllers/ClerkWebhooks.js'
import userRouter from './routes/userRouter.js'
import hotelRouter from './routes/hotelRouter.js'
import roomRouter from './routes/roomRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import bookingRouter from './routes/bookingRoutes.js'
import { stripeWebhooks } from './controllers/stripeWebhooks.js'




dotenv.config()


connectCloudinary()
connectDB()
const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://booknow-two.vercel.app"
  ],
  credentials: true
}));
const Port = process.env.PORT

//API to listen to stripe wwebhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks);

//middlewares
app.use(express.json())
app.use(clerkMiddleware())

//api to listen to clerk webhooks
app.get('/', (req,res)=>{res.send("server is running")})
app.post("/api/clerk", clerkWebhooks)

app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)


// running server
app.listen(Port, ()=>{
    console.log(`server running successfully on ${Port}`)
})

//console.log(process.env)