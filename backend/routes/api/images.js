const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');


// Delete an Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await Image.findByPk(req.params.imageId, {
        // where: { req.user.id }
    })

    if (!image) {
        res.status(404)
        return res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
        })
    }

    if (image.userId === req.user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }

    await image.destroy()
    return res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        })
})


module.exports = router;