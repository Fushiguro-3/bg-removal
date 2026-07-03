// configs/mongodb.js
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    mongoose.connection.on('connected', () => console.log("database connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`);
    isConnected = true;
};

export default connectDB;