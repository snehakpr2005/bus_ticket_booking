import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },

    userName: {
        type: String,
        required: true,
    },


    distance: {
        type: Number,
        required: true,
    },


    pricePerKm: {
        type: Number,
        required: true
    },


    travelClass: {
        type: String,
        enum: ["Economy", "Business", "Luxury"],
        required: true
    },


    fare: Number,
},

    { timestamps: true });



export default mongoose.model("Booking", bookingSchema);