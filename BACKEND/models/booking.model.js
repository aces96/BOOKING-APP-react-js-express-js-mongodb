const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date_from: {
        type: Date,
        required: true
    },
    date_to: {
        type: Date,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type:  String,
        enum: ['refused', 'accepted', 'pending'],
        default: 'pending',
    },
    paid: {
        type: Boolean,
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'A booking must belongs to a user']
    }
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;