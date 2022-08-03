const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');


// Get all Spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                attributes: [],
                where: {previewImage: true}
            }
        ],
        attributes: {
        include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
                [sequelize.literal("Images.url"), "previewImage"]
            ]
        },
        group: ['Spot.id'],
    })

    res.status(200)
    res.json({Spot: spots})
})


// router.get('/', async (req, res) => {
//     const spots = await Spot.findAll({
//         attributes: {
//             include: [
//                 { model: Image,
//                     where: { previewImage: true },
//                     attributes: []
//                 }],
//             include: [
//                 [sequelize.literal("Images.url"), "previewImage"]]
//         }
//     })
//     const avgRev = Review.findAll({
//         attributes: {
//             include: [
//                 [
//                     sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
//                 ]
//             ]
//         }
//     })

//     let response = {
//         id: spots.id,
//         ownerId: spots.ownerId,
//         address: spots.address,
//         city: spots.city,
//         state: spots.state,
//         country: spots.country,
//         lat: spots.lat,
//         lng: spots.lng,
//         name: spots.name,
//         description: spots.description,
//         price: spots.price,
//         createdAt: spots.createdAt,
//         updatedAt: spots.updatedAt,
//         avgRating: avgRev[0].dataValues.avgRating,
//         previewImage: spots.previewImage
//     }
//     console.log(avgRev[0].dataValues.avgRating)
//     return res.json(response)
// })


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserSpots = await Spot.findAll({
        where: {
            ownerId: req.user
        },
    });
    res.status(200);
    res.json(currentUserSpots);
})


// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spots = await Spot.findByPk(req.params.spotId);
    // , {
    //     include: [
    //         {
    //             model: Image,
    //         },
    //         {
    //             model: User
    //         }
    //     ]
    // });

    if (!spots) {
        res.status(404)
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }
    return res.json(spots)
})




module.exports = router;