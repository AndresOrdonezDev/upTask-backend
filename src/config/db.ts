import mongoose from "mongoose";
import colors from 'colors'
import { exit } from 'node:process';

export const connectDB = async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.bgMagenta('connect to db => ' + url));
    } catch (error) {
        console.log(colors.bgRed('Error to connect to MongoDB'));
        exit(1)
    }
}