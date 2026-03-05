import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import connectDB from './configs/db.js'
import clerkWebhooks from './controllers/ClerkWebhooks.js'
import userRouter from './routes/userRouter.js'
import hotelRouter from './routes/hotelRouter.js'
import roomRouter from './routes/roomRoutes.js'




dotenv.config()
connectDB()
const app = express()

app.use(cors())
const Port = process.env.PORT

//middlewares
app.use(express.json())
app.use(clerkMiddleware())

//api to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks)

app.use('/api/user',userRouter)
app.use('/api/hotel',hotelRouter)
app.use('/api/rooms', roomRouter)


// running server
app.listen(Port, ()=>{
    console.log(`server running successfully on ${Port}`)
})

//console.log(process.env)