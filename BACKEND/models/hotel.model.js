const mongoose = require('mongoose');

const validator = require('validator');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A hotel must have a name'],
    },
    description: {
        type: String,
        required: [true, 'A hotel must have an description'],
    },
    imageCover: {
        type: String,
        default: 'image'
    },
    images: {
        type: [String],
        default: []
    },
    stars: {
        type: Number,
        required: [true, 'A hotel must have an stars'],
        min:0,
        max:5,
        default:0,
    },
    status: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'An hotel must have a user id']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

hotelSchema.virtual('rooms', {
    ref: 'room',
    foreignField: 'hotel',
    localField: '_id'
});

const Hotel = mongoose.model('hotel', hotelSchema);

module.exports = Hotel;
