const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const {Op} = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const {imageId} = req.params;
    const userId = req.user.id;

    const existingImage = await ReviewImage.findByPk(imageId)

    if(!existingImage){
        return res.status(404).json( {
            message: "Review Image couldn't be found",
            statusCode: 404
          })
    }

    const {reviewId} = existingImage

    const review = await Review.findByPk(reviewId)

    if (review.userId !== userId){
        return res.status(403).json(   {
            message: "Forbidden, user must be the creator of the review",
            statusCode: 403
          })
    }

    await existingImage.destroy()
    return res.json(  {
        "message": "Successfully deleted",
        "statusCode": 200
      })

})







module.exports = router;
