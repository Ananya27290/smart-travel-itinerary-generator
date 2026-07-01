const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({

    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },

    currentLocation: {
        type: String
    },

    destination: {
        type: String
    },

    goingDate: {
        type: String
    },

    returnDate: {
        type: String
    },

    travelers: {
        type: Number
    },

    budget: {
        type: Number
    },

    travelType: {
        type: String
    }
    

});

module.exports = mongoose.model('Trip', tripSchema);