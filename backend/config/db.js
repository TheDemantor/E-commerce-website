import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config();

const connectDB = async ()=>{
    // console.log(process.env.MONGO_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;