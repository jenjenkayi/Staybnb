const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');
const image = require('../../db/models/image');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required.'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required.'),  
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required.'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid.'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid".'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required.'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required.'),
    handleValidationErrors
]

// Get all Spots
router.get('/', async (req, res) => {
    // let { page, size } = req.query;

    // page = parseInt(page);
    // size = parseInt(size);

    // if (Number.isNaN(page)) page = 0;
    // if (Number.isNaN(size)) size = 20;

    const spots = await Spot.findAll({
        include: [
                {
                    model: Review,
                    attributes: []
                },
            ],
        attributes: {
            include: [
                    [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
                ]
        },
        // limit: size,
        // offset: size * (page - 1),

        group:['Spot.id']
    })
    
    for (let i = 0; i < spots.length; i++) {
    let spot = spots[i]

        let previewImage = await Image.findOne({
            attributes: 
               ['url'],
            where: { previewImage: true, spotId: spots[i].id},
            raw: true
        })
        if (previewImage) {
            spot.dataValues.previewImage = previewImage.url
        }
    }
    
    return res.json(spots)
})


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
    
        include: [
            {
                model: Review,
                attributes: []
            },
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
            ]
        },
        group: ['Spot.id']
    })

    for (let i = 0; i < currentUserSpots.length; i++) {
        let spot = currentUserSpots[i]

        let previewImage = await Image.findOne({
            attributes: ['url'],
                where: { previewImage: true, spotId: currentUserSpots[i].id },
            })
            spot.dataValues.previewImage = previewImage
        }

    return res.json({Spots: currentUserSpots})
})


// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: User, as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review,
                attributes: []
            },
        ],
        attributes: {
            include: [
                    [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"]
                ]
            },
        group: ['Spot.id', 'Owner.id']
    })
    
    let Images = await Image.findAll({
        attributes: ['id', ['spotId', 'imageableId'], 'url'],
        where: { spotId: spot.id },
    })

    let reviewCount = await Review.count({
        where: { spotId: spot.id },
    })

    spot.dataValues.Images = Images
    spot.dataValues.reviewCount = reviewCount
  
    if (!spot) {
        res.status(404)
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    } 
    
    return res.json(spot);
    
})


//Create a Spot
router.post('/', requireAuth, async (req, res) => {
    
    const { address, city, state, country, lat, lng, name, description, price } = req.body
 
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    
    await newSpot.save()
    res.json(newSpot)
});


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404)
        return res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
    }

    const { url, previewImage } = req.body;

    const newImage = await Image.create({
        previewImage: previewImage,
        url: url,       
        spotId: req.params.spotId,
        userId: req.user.id
    })


    const response = {
        id: newImage.id,
        imageableId: newImage.spotId,
        url: newImage.url
    }

    await newImage.save()
    res.json(response)
})

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    
    spot.address = address,
    spot.city = city,
    spot.state = state,
    spot.country = country,
    spot.lat = lat,
    spot.lng = lng,
    spot.name = name,
    spot.description = description,
    spot.price = price
    
    if (!spot) {
        res.status(404)
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }

    await spot.save()
    return res.json(spot)
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }

    await spot.destroy()
    return res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
    })
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Image,
                attributes: ['id', ['reviewId', 'imageableId'], 'url']
            },
        ],

    })

    if (!spot) {
        res.status(404)
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }

    res.status(200);
    return res.json({ Reviews: reviews});

})


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId }
    })

    const { review, stars } = req.body;

    const newReview = await Review.create({
        userId: req.params.userId,
        spotId: req.params.spotId,
        review,
        stars
    })
   

    if (!spot) {
        res.status(404)
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }

    if (reviews) {
        res.status(404)
        return res.json(
            {
                "message": "User already has a review for this spot",
                "statusCode": 403
            }
        )
    }

    await newReview.save()
    return res.json(newReview)
})


// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404)
        return res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
    }
    
    const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
    })

    const ownerBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
    })

    if (spot.id === req.user.id) {
        return res.json({Bookings: ownerBookings});
    } else {
        return res.json({Bookings: bookings});
    }
})


// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const bookings = await Booking.findAll({
        where: { spotId: req.params.spotId }
    })

    const { startDate, endDate } = req.body;

    const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate, 
        endDate
    })

    if (startDate > endDate) {
        res.status(403)
        return res.json(
            {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            }
        )
    }

    if (bookings.startDate !== startDate && bookings.endDate !== endDate) {
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

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    await newBooking.save()
    return res.json(newBooking)
})


module.exports = router;