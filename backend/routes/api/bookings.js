const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });
    const currentUserBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        },
        // group: ['Spot.id'],
    })

    for (let i = 0; i < spots.length; i++) {
        let  spot = spots[i]

        let previewImage = await Image.findOne({
            attributes: ['url'],
            where: { previewImage: true, spotId: spot.id },
            raw: true
        })

        // if (previewImage) {
            spot.dataValues.previewImage = previewImage
        // }
    }


    return res.json({ Bookings: currentUserBookings });
})


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
  
    if (!booking) {
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    
    const { startDate, endDate } = req.body;
    booking.startDate = startDate,
    booking.endDate = endDate
    
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

    if (startDate <= today) {
        res.status(403)
        return res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
        })
    }

    if (booking.endDate <= today) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
  
    if (booking.startDate === req.body.startDate) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }

    await booking.save()
    return res.json(booking)
})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const spots = await Spot.findAll();

    if (!booking) {
        res.status(404)
        return res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
            })
    }

    if (booking.userId !== req.user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }

    const today = new Date();
    if (booking.startDate < today) {
        res.status(404)
        return res.json({
                "message": "Bookings that have been started can't be deleted",
                "statusCode": 403
            })
    }

    await booking.destroy()
    return res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        })
})





module.exports = router;