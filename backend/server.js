import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()


app.use(cors())
app.use(express.json())
const Port = process.env.PORT
// running server
app.listen(Port, ()=>{
    console.log(`server running successfully on ${Port}`)
})

// console.log(process.env)