import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors";
import { authMiddleware } from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api", bookingRoutes);
app.use("/auth", authRoutes);


// Public routes


app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "This is a protected route",
        user: req.user
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});