const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
    spotId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);