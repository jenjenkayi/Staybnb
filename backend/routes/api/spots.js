const express = require('express');
const router = express.Router();

const { Spot, Review, Image, sequelize } = require('../../db/models');


// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ]
            ],
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




module.exports = router;