const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');
const image = require('../../db/models/image');


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
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
        // group: ['Review.id'],
    })
    
    res.status(200);
    return res.json({Reviews: currentUserReviews });
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        res.status(404)
        return res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
            })
    }

        const { url, previewImage } = req.body;

        const newImage = await Image.create({
            url,
            previewImage,
            userId: req.user.id,
            reviewId: req.params.reviewId,
            spotId: review.spotId
        })

    // let imageCount = await Image.count({
    //     where: { previewImage: true },
    // })

    // if (imageCount >= 10) {
    //     res.status(404)
    //     return res.json({
    //             "message": "Maximum number of images for this resource was reached",
    //             "statusCode": 403
    //         })
    // }

    let response = {
        id: newImage.id,
        imageableId: newImage.reviewId,
        url: newImage.url
    }

    // await newImage.save()
    res.json(response)
})

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const reviews = await Review.findByPk(req.params.reviewId)

    if (!reviews) {
        res.status(404)
        return res.json(
            {
                "message": "Review couldn't be found",
                "statusCode": 404
            }
        )
    }

    reviews.review = review, 
    reviews.stars = stars
      

    await reviews.save()
    res.json(reviews)
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