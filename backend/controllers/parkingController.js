const ParkingSpot = require('../models/ParkingSpot');

// Fetch all available spots

const getAvailableSpots = async (req, res) => {
    try {
        const spots = await ParkingSpot.find({ isAvailable: true });
        res.json(spots);
    } catch (error) {
        res.status(500).json({ message: 'error fetching parking spots' });
    }
};

// Create new parking spots ( Only the Admin can perform this action)
const createParkingSpot = async (req, res) => {
    const { spotId, location } = req.body;

    try {
        const newSpot = new ParkingSpot({
            spotId,
            location,
            isAvailable: true
        });
        await newSpot.save();
        res.status(201).json(newSpot);
    } catch (error) {
        res.status(500).json({ message: 'Error creating parking spot' });
    }
};

// Label a parking spot reserver (changing its status of availability)
const reserveSpot = async (req, res) => {
    const { spotId } = req.params;

    try {
        const spot = await ParkingSpot.findOne({ spotId });
        if (!spot) {
            return res.status(404).json({ messages: 'Spot not found' });
        }
        spot.isAvailable = false;
        await spot.save();
        res.json(spot);
    } catch (error) {
        res.status(500).json({ message: 'Error reserving parking spot' });
    }
};

module.exports = { getAvailableSpots, createParkingSpot, reserveSpot };