import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/merndb');
        console.log('successful connection to database')
    } catch (error) {
        console.log(error.message);
    }
};