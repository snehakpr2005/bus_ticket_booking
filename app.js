import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});