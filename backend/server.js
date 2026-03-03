import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import connectDB from './configs/db.js'




dotenv.config()
connectDB()
const app = express()

app.use(cors())
const Port = process.env.PORT

//middlewares
app.use(express.json())
app.use(clerkMiddleware())


// running server
app.listen(Port, ()=>{
    console.log(`server running successfully on ${Port}`)
})

// console.log(process.env)