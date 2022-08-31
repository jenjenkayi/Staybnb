const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, SpotImage, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const { Op } = require('sequelize')

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
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required.'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
];

const validatePagination = [
    check('page')
        .optional()
        .isInt({ min: 0, max: 10 })
        .withMessage('Page must be greater than or equal to 0.'),
    check('size')
        .optional()
        .isInt({ min: 0, max: 20 })
        .withMessage('Size must be greater than or equal to 0.'),
    check('maxLat')
        .optional()
        .isDecimal()
        .withMessage('Maximum latitude is invalid.'),
    check('minLat')
        .optional()
        .isDecimal()
        .withMessage('Minimum latitude is invalid.'),
    check('minLng')
        .optional()
        .isDecimal()
        .withMessage('Maximum longitude is invalid.'),
    check('maxLng')
        .optional()
        .isDecimal()
        .withMessage('Minimum longitude is invalid.'),
    check('minPrice')
        .optional()
        .isDecimal({ min: 0 })
        .custom((value, { req }) => {
            if (parseFloat(value) < 0) {
                return Promise.reject('Minimum price must be greater than or equal to 0')
            } else {
                return true
            }
        })
        .withMessage('Minimum price must be greater than or equal to 0.'),
    check('maxPrice')
        .optional()
        .isDecimal({ min: 0 })
        .custom((value, { req }) => {
            if (parseFloat(value) < 0) {
                return Promise.reject('Maximum price must be greater than or equal to 0')
            } else {
                return true
            }
        })
        .withMessage('Maximum price must be greater than or equal to 0.'),
    handleValidationErrors
];

// Get all Spots
// Add Query Filters to Get All Spots
router.get('/', validatePagination, async (req, res) => {
    let pagination = {};
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    
    page = parseInt(page);
    size = parseInt(size);
    
    if (!page) page = 0;
    if (!size) size = 20;
    
    if (page >= 1 && size >= 1) {
        pagination.limit = size,
        pagination.offset = size * (page - 1)
    } 

    let where = {}

    if (minLat) {where.lat = {[Op.gte]: parseFloat(minLat)}}
    if (maxLat) {where.lat = {[Op.lte]: parseFloat(maxLat)}}
    if (minLng) {where.lng = {[Op.gte]: parseFloat(minLng)}}
    if (maxLng) {where.lng = {[Op.lte]: parseFloat(maxLng)}}
    if (minPrice) {where.price = {[Op.gte]: parseFloat(minPrice)}}
    if (maxPrice) {where.price = {[Op.lte]: parseFloat(maxPrice)}}

    const spots = await Spot.findAll({
            include: [
                { model: Review, attributes: [] },
            ],
            where,
            ...pagination,
    })
    
    for (let i = 0; i < spots.length; i++) {
            let spot = spots[i];

            let totalReview = await Review.sum('stars', { 
                where: { spotId: spot.id }
            });
            let totalStars = await Review.count({
                 where: { spotId: spot.id }
            });
            let avgRating = totalReview / totalStars;

            let previewImage = await SpotImage.findOne({
                attributes:['url'],
                where: { spotId: spot.id },
            })

            if (previewImage) {
                spot.dataValues.previewImage = previewImage.url
            }
                spot.dataValues.avgRating = parseFloat(spot.dataValues.avgRating).toFixed(1);
                spot.dataValues.lat = parseFloat(spot.dataValues.lat);
                spot.dataValues.lng = parseFloat(spot.dataValues.lng);
        }


            return res.json({
                    "Spots": spots,
                    "page": page,
                    "size": size
                })
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

        let previewImage = await SpotImage.findOne({
            attributes: ['url'],
                where: { spotId: spot.id },
            })
            
       if (previewImage) {
            spot.dataValues.previewImage = previewImage.dataValues.url
        }
        spot.dataValues.lat = parseFloat(spot.dataValues.lat);
        spot.dataValues.lng = parseFloat(spot.dataValues.lng);
        spot.dataValues.avgRating = parseFloat(spot.dataValues.avgRating).toFixed(1);
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
    
    if (!spot) {
        res.status(404)
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    } 

    let SpotImages = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: { spotId: spot.id },
    })

    let numReviews = await Review.count({
        where: { spotId: spot.id },
    })

    spot.dataValues.SpotImages = SpotImages
    spot.dataValues.numReviews = numReviews
    // spot.dataValues.SpotImages.preview = true

    spot.dataValues.lat = parseFloat(spot.dataValues.lat);
    spot.dataValues.lng = parseFloat(spot.dataValues.lng);
    spot.dataValues.avgStarRating = parseFloat(parseFloat(spot.dataValues.avgStarRating).toFixed(1));
    
    return res.json(spot);
    
})


//Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    
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
    
    newSpot.dataValues.lat = parseFloat(newSpot.dataValues.lat);
    newSpot.dataValues.lng = parseFloat(newSpot.dataValues.lng);

    res.json(newSpot)

});


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404)
        return res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
    }

    
    const { url, preview } = req.body;

    const newImage = await SpotImage.create({
        url,       
        spotId: req.params.spotId,
        preview: true
        // userId: req.user.id
    })

    // const response = {
    //     id: newImage.id,
    //     imageableId: newImage.spotId,
    //     url: newImage.url
    // }
   
    const response = {
        id: newImage.id,
        url: newImage.url,
        preview: true
    }

    await newImage.save()
    res.json(response)
})

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
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
    
    // if (spot.ownerId !== req.user.id) {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // }

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    
    spot.address = address,
    spot.city = city,
    spot.state = state,
    spot.country = country,
    spot.lat = lat,
    spot.lng = lng,
    spot.name = name,
    spot.description = description,
    spot.price = price
    
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

    // if (spot.ownerId !== req.user.id) {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // }

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
    const reviews = await Review.findOne({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ],
        // group: ['Review.id']
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
    return res.json({ Reviews: [reviews]});

})


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const spotId = req.params.spotId
    const reviewed = await Review.findOne({
        where: { spotId: spotId, userId: req.user.id }
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
    
    const { review, stars } = req.body;

    if (!reviewed) {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: spotId,
            review,
            stars
        });
        await newReview.save()
        return res.json(newReview)
    } else {
        res.status(403)
        return res.json(
            {
                "message": "User already has a review for this spot",
                "statusCode": 403
            }
            )
        }
    
})


// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
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

    const userBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
    })

    if (spot.ownerId === req.user.id) {
        return res.json({Bookings: userBookings});
    } else {
        return res.json({Bookings: bookings});
    }
})


// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    // if (spot.ownerId === req.user.id) {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // }

    if (startDate >= endDate) {
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId,
            // raw: true 
            [Op.and]: [
                { endDate: { [Op.gte]: startDate } },
                { startDate: { [Op.lte]: endDate } },
            ],
        },
    });

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

    const newBooking = await Booking.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate,
            endDate
    })

    newBooking.spotId = parseFloat(newBooking.spotId)
    res.status(200)
    return res.json(newBooking)
})



module.exports = router;