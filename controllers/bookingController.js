import Booking from "../models/booking.js";

//createbooking
export const createBooking = async (req, res) => {
    try {
        const { userId, userName, distance, pricePerKm, travelClass } = req.body;


        const baseFare = distance * pricePerKm;


        const GST = baseFare * 0.05; // 5% GST
        const finalFare = baseFare + GST;

        const booking = new Booking({
            userId,
            userName,
            distance,
            pricePerKm,
            travelClass,

            fareBreakdown: {
                baseFare,
                GST,
                finalFare
            }
        });

        await booking.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//getallbookings

export const getBookings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const totalBookings = await Booking.countDocuments();

        const bookings = await Booking.find()
            .skip(skip)
            .limit(limit);

        res.json({
            totalBookings,
            currentPage: page,
            totalPages: Math.ceil(totalBookings / limit),
            data: bookings,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//getbookingbyid
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//updatebooking
export const updateBooking = async (req, res) => {
    try {
        const { distance, pricePerKm } = req.body;

        let updateData = { ...req.body };

        // Recalculate fare if updated
        if (distance !== undefined && pricePerKm !== undefined) {
            const baseFare = distance * pricePerKm;
            const GST = baseFare * 0.05;
            const finalFare = baseFare + GST;

            updateData.fareBreakdown = {
                baseFare,
                GST,
                finalFare
            };
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//deletebooking
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

