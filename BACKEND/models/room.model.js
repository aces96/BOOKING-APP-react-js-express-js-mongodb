const mongoose = require('mongoose');
const validator = require('validator');
const Type = require('../models/roomType.model')

const typeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim: true
    }
    
})

const roomSchema = new mongoose.Schema({
    
    room_quality: {
        type: Number,
        require: [true, 'A room must have a quatity']
    },
    description: {
        type: String,
        require: [true, 'A room must have a description']
    },
    price: {
        type: Number,
        require: [true, 'A room must have a price']
    },
    images: [{
        type: String,
        // require: [true, 'A room must have images']
    }],
    type:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Types'
    }],
    // isAvailable: {
    //     type: Boolean, 
    //     default: false
    // }
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotel',
        // required: [true, 'A room must belongs to an hotel !']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        // required: [true, 'A room must belongs to a user']
    },
    roomType: {
        type: mongoose.Schema.ObjectId,
        ref: 'roomtype',
        required: [true, 'A Room must have a type']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

roomSchema.pre(/^find/, function(next) {

    // this.populate({
    //     path: 'hotel',
    //     select: 'name stars'
    // })
    this.populate({
        path: 'user',
        select: 'name role'
    });

    next();
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;