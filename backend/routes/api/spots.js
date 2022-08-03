const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');


// Get all Spots
// router.get('/', async (req, res, next) => {
//     const spots = await Spot.findAll({
//         include: [
//             {
//                 model: Review,
//                 attributes: []
//             },
//             {
//                 model: Image,
//                 attributes: [],
//                 where: {previewImage: true}
//             }
//         ],
//         attributes: {
//         include: [
//                 [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
//                 [sequelize.literal("Images.url"), "previewImage"]
//             ]
//         },
//         group: ['Spot.id'],
//     })

//     res.status(200)
//     res.json({Spot: spots})
// })


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
        // console.log(spot);
    }

    // const avgRev = Review.findAll({
    //     attributes: 
    //         [
    //             [
    //                 sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
    //             ]
    //         ],
    // })

    // console.log(spots);
    // console.log(avgRev.dataValues);

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
    // console.log(avgRev[0].dataValues.avgRating)
    return res.json(spots)
})


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserSpots = await Spot.findByPk(req.user.id, {
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

        let previewImage = await Image.findOne({
            attributes: ['url'],
                where: { previewImage: true, spotId: currentUserSpots.id },
            })
            currentUserSpots.dataValues.previewImage = previewImage

        return res.json({Spots: currentUserSpots})
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Image,
                attributes: ['id', 'url']
            },
            {
                model: User,
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
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],

            ]
        },
        group: ['Spot.id']
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
    return res.json(spot)
})


//Create a Spot
// router.post('/', async (req, res) => {
//    const ownerId = req.params.id
//     const { address, city, state, country, lat, lng, name, description, price } = req.body

//     const owner = await User.findByPk(ownerId)

//     const newSpot = await Spot.create({
//         ownerId: owner.id,
//         address, 
//         city, 
//         state, 
//         country, 
//         lat, 
//         lng, 
//         name, 
//         description, 
//         price,
//     })
//     res.status(201)
//     return res.json(newSpot)
// });







module.exports = router;