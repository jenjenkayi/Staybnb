const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserReviews = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: Image,
                attributes: ['id', ['reviewId', 'imageableId'], 'url']
            },
        ],
        
        // where: {
        //     userId: req.user.id
        // },
    })
    
    return res.json(currentUserReviews);
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Review.findByPk(req.params.spotId, {
        where: {
            spotId: req.user.id
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

    return res.json({ Reviews: currentUserReviews });

})


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async (req, res) => {
    const spotid = req.params.spotId;
    const spot = await Review.findByPk(req.params.spotId, {
    })

    const { userId, spotId, review, stars } = req.body;

    const newReview = await Review.create({
        userId, 
        spotId, 
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

    if (review) {
        res.status(404)
        return res.json(
            {
                "message": "User already has a review for this spot",
                "statusCode": 403
            }
        )
    }

    await newReview.save()
    res.json(newReview)
})


// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {


    if (!review) {
        res.status(404)
        return res.json(
            {
                "message": "Review couldn't be found",
                "statusCode": 404
            }
        )
    }

    if (images > 10) {
        res.status(404)
        return res.json(
            {
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            }
        )
    }
})

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { userId, spotId, review, stars } = req.body
    const spot = await Spot.findByPk(req.params.spotId)

    spot.userId = userId, 
    spot.spotId = spotId, 
    spot.review = review, 
    spot.stars = stars
      

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
    res.json(spot)
})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        res.status(404)
        return res.json(
            {
                "message": "Review couldn't be found",
                "statusCode": 404
            }
        )
    }

    await review.destroy()
    return res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        })
})

module.exports = router;