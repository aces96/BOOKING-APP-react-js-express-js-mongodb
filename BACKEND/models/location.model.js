const mongoose = require('mongoose');
const validator = require('validator');

const locationSchema = mongoose.Schema({
    city: {
        type: String,
        required: [true, 'A Room must have a city'],
    },
    adress: {
        type: String,
        required: [true, 'A Room must have an adress']
    },
    coordinats: {
        type: String,
        required: [true, 'A Room must have a coordinats']
    }

});

const Location = mongoose.model('location', locationSchema);

module.exports = Location;