import mongoose from 'mongoose'

const connectDB= async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("database connected successfully"));
        await mongoose.connect(`${process.env.MONGO_URI}`)
        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

export default connectDB