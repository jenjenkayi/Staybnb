const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');



// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
})




// Get all Bookings for a Spot based on the Spot's id
// Create a Booking from a Spot based on the Spot's id
// Edit a Booking
// Delete a Booking

module.exports = router;