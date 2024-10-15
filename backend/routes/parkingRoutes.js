const express = require('express');
const { getAvailableSpots, createParkingSpot, reserveSpot } = require('../controllers/parkingController');
const router = express.Router();

const { get, model } = require('mongoose');

// GET /api/parking/available
router.get('/available', getAvailableSpots);

// POST /api/parking (Admin Only)
router.post('/', createParkingSpot);

// PUT /api/parking/reserve/:spotId (to reserve a spot)
router.put('/reserve/:spotId', reserveSpot);

model.exports = router;