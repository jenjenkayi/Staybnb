const express = require('express');
const router = express.Router();

const { Spot, Review, Image, User, sequelize } = require('../../db/models');

const { restoreUser } = require('../../utils/auth');


// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ]
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                    // where: {
                    //     previewImage: true
                    // },
                attributes: ['previewImage']
            }
        ]
    })

    return res.json({spots})
    
})

// Get all Spots owned by the Current User
router.get('/current', restoreUser, async (req, res) => {
    const { currentUser } = req;

    const spots = await Spot.findAll(req.params.id, {
        include: [
            {
                model: User
            },
        ]
    });

    // const { user } = req;
    // if (user) {
    //     return res.json({
    //         spots
    //     });
    // } else return 
    res.json({spots});
});

// Get details of a Spot from an id
router.get('/:spotId', restoreUser, async (req, res) => {
    const spots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Image,
                // attributes: []
            },
            {
                model: User, as: 'Owner'
            }
        ]
    });

    return res.json(spots)
})




module.exports = router;