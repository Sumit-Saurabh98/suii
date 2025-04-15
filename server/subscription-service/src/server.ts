import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Subscription Service is running");
});


// listen on port and dbconnect
app.listen(PORT, async () =>{
    try {
        console.log(`Subscription Service is running on port ${PORT}`);
        await connectDB();
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
})
