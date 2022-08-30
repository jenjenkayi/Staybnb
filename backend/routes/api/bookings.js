const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const { Spot, Review, SpotImage, ReviewImage, User, Booking, sequelize } = require('../../db/models');


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const currentUserBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            // attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        },
    })
    
    // if (!req.user.id) {
    //     res.json({
    //         "message": "Authentication required",
    //         "statusCode": 401
    //     })
    // }
    
    for (let i = 0; i < currentUserBookings.length; i++) {
        let  booking = currentUserBookings[i]
        
        const spot = await Spot.findOne({
            where: { id: booking.spotId},
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            });

        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: booking.spotId },
        })

        if (previewImage) {
            // booking.dataValues.Spot = spot
            spot.dataValues.previewImage = previewImage.dataValues.url
            spot.dataValues.lat = parseFloat(spot.dataValues.lat);
            spot.dataValues.lng = parseFloat(spot.dataValues.lng);
        }
    }

    return res.json({ Bookings: currentUserBookings });
})


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);
    
    if (!booking) {
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    if (req.user.id !== booking.userId) {
            res.status(403)
            return res.json({
                    "message": "Forbidden",
                    "statusCode": 403
                });
    }
            
    if (startDate >= endDate) {
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }
    
    const today = new Date();
    if (booking.dataValues.endDate <= today) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
    
    const bookings = await Booking.findAll({
        where: { 
            spotId: booking.spotId,
            [Op.and]: [
                { startDate: startDate },
                { endDate: endDate }
            ]
        }
    })

    if (bookings.length > 0) {
        res.status(403)
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }
    
    booking.startDate = startDate,
    booking.endDate = endDate

    await booking.save()
    return res.json(booking)
})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    
    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    
    const spot = await Spot.findOne({ where: { id: booking.spotId }});

    if (booking.dataValues.userId !== req.user.id && spot.ownerId !== req.user.id) {
        return res.status(403).json({ 
            message: 'You do not have permission to delete this booking.', 
            statusCode: 403 
        });
    }

    const today = new Date();
    if (booking.startDate <= today) {
        return res.status(403).json({
                "message": "Bookings that have been started can't be deleted",
                "statusCode": 403
            })
    }

    await booking.destroy()
    return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    })


module.exports = router;