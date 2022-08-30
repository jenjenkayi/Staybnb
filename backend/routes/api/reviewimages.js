const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, ReviewImage, User, Booking, sequelize } = require('../../db/models');


// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
        // where: { req.user.id }

    if (!reviewImage) {
        res.status(404)
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    // if (reviewImage.userId !== req.user.id) {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // }

    await reviewImage.destroy()
    return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
})


module.exports = router;