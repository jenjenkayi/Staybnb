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
            attributes: []
        },
    })

    for (let i = 0; i < currentUserBookings.length; i++) {
        let booking = currentUserBookings[i]

    
        const currentUserSpots = await Spot.findAll({
            where: { id: booking.dataValues.spotId },
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        })

        for (let i = 0; i < currentUserSpots.length; i++) {
            let spot = currentUserSpots[i]

            let previewImage = await SpotImage.findOne({
                attributes: ['url'],
                where: { spotId: spot.id },
            })

            if (previewImage) {
                spot.dataValues.previewImage = previewImage.dataValues.url
            }
            spot.dataValues.lat = parseFloat(spot.dataValues.lat);
            spot.dataValues.lng = parseFloat(spot.dataValues.lng);
        }
            
        booking.dataValues.Spot = currentUserSpots

    }
    // let spotId = currentUserBookings[0].dataValues.spotId
    // let id = Spot.id
    // let spot = await Spot.findOne({
    //     where: { id: spotId },
    //     attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
    // })

    // let spot = await Spot.findOne({
    //     where: { id: req.params.spotId}
    // })

    // let previewImage = await SpotImage.findOne({
    //     where: { spotId: spot.id },
    //     attributes: ['url'],
    // })

    // console.log(spot.id)
    // console.log(currentUserBookings.dataValues.spotId)
    // console.log(spotId) //4

    // spot.dataValues.previewImage = previewImage.dataValues.url
    // spot.dataValues.lat = parseFloat(spot.dataValues.lat);
    // spot.dataValues.lng = parseFloat(spot.dataValues.lng);



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
        where: { spotId: booking.spotId }, 
        raw: true 
    });

    for (let b of bookings) {
        if (startDate <= b.endDate && endDate >= b.startDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        }
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