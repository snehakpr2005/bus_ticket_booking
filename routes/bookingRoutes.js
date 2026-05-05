import express from "express";
import {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings", getBookings);
router.get("/bookings/:id", getBookingById);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

export default router;