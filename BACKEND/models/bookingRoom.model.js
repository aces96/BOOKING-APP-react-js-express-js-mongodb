const mongoose = require('mongoose');
const validator = require('validator');

const BookingRoomSchema = new mongoose.Schema({
    rooms_quantity: {
        type: Number,
        required: [true, 'A Room must have a quatity']
    },
    price: {
        type: Number,
        required: [true, 'A Room must have a price']
    },
    total_price: {
        type: Number,
        required: [true, 'A Room must have a total price']
    },
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'booking',
        required: [true, 'A Booking Room must belongs to a booking']
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: 'room',
        required: [true, 'A Booking Room must belongs to a group of rooms']
    }
});

const Bookingroom = mongoose.model('bookingroom', BookingRoomSchema);
module.exports = Bookingroom;