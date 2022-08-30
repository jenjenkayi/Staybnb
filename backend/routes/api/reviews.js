const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, ReviewImage, User, Booking, sequelize } = require('../../db/models');
// const image = require('../../db/models/image');

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
                model: ReviewImage, as: 'Images',
                attributes: ['id', ['reviewId', 'imageableId'], 'url']
            },
        ]
    })

    res.status(200);
    return res.json({Reviews: currentUserReviews});
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

    // if (review.userId !== req.user.id) {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // } 

        const { url, previewImage } = req.body;

        const newImage = await ReviewImage.create({
            url,
            previewImage,
            userId: req.user.id,
            reviewId: req.params.reviewId,
            spotId: review.spotId
        })

    let images = await ReviewImage.findAll({
        where: { reviewId: req.params.reviewId },
    })

    if (images.length >= 10) {
        res.status(403)
        return res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
    }

    let response = {
        id: newImage.id,
        imageableId: newImage.reviewId,
        url: newImage.url
    }

    // await newImage.save()
    res.json(response)
})

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const reviews = await Review.findByPk(req.params.reviewId)
    const { review, stars } = req.body

    if (!reviews) {
        res.status(404)
        return res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
            })
    }

    // if (reviews.userId !== req.user.id) {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // } 

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
        return res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
        })
    }

    // if (review.userId !== req.user.id) {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // } 

    await review.destroy()
    res.status(200)
    return res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        })
})

module.exports = router;