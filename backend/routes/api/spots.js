const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');
const user = require('../../db/models/user');

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
        group:['Spot.id']
    })
    
    for (let i = 0; i < spots.length; i++) {
    let spot = spots[i]

        let previewImage = await Image.findOne({
            attributes: 
               ['url'],
            where: { previewImage: true, spotId: spots[i].id},
        })
        spot.dataValues.previewImage = previewImage
    }
    return res.json(spots)
})

    // const avgRev = Review.findAll({
    //     attributes: 
    //         [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    // })
    // let response = {
    //     id: spots.id,
    //     ownerId: spots.ownerId,
    //     address: spots.address,
    //     city: spots.city,
    //     state: spots.state,
    //     country: spots.country,
    //     lat: spots.lat,
    //     lng: spots.lng,
    //     name: spots.name,
    //     description: spots.description,
    //     price: spots.price,
    //     createdAt: spots.createdAt,
    //     updatedAt: spots.updatedAt,
    //     avgRating: avgRev[0].dataValues.avgRating,
    //     previewImage: spots.previewImage
    // }


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
                model: Image,
                attributes: ['id', ['spotId', 'imageableId'] , 'url']
            },
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
                    [sequelize.fn("COUNT", sequelize.col("Reviews.review")), "numReviews"],
                    [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"]
                ]
            },
        group: ['Spot.id']
    })
    
    let Images = await Image.findAll({
        attributes: ['id', ['spotId', 'imageableId'], 'url'],
        where: { spotId: spot.id },
    })

    spot.dataValues.Images = Images
  
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
router.post('/', validateSpot, async (req, res) => {
    
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body
 
    const newSpot = Spot.build({
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

    // await newSpot.save()
    res.send(newSpot)
});


// Add an Image to a Spot based on the Spot's id





module.exports = router;