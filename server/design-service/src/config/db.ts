import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        if(!process.env.MONGO_URI || process.env.MONGO_URI === "") {
            throw new Error("MongoDB URI is not defined");
        }
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB", connection.connection.host);
    } catch (error) {
        console.log("MongoDB Error", error);
        process.exit(1);
    }
};

export default connectDB;