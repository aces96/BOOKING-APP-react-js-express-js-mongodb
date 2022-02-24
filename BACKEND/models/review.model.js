const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    comment = {
        type: String
    },
    rating = {
        type: Number,
        min: 1,
        max: 5
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotel',
        required: [true, 'A review must belongs to an hotel']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'A review must belongs to a user']
    }
});

const Review = mongoose.model('review', reviewSchema)

module.exports = Review