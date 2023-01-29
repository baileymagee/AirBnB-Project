const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const {Op} = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const {imageId} = req.params;
    const userId = req.user.id

    const existingImage = await SpotImage.findByPk(imageId)


    if(!existingImage){
        return res.status(404).json( {
            message: "Spot Image couldn't be found",
            statusCode: 404
          })
    }

    const {spotId} = existingImage

    const spot = await Spot.findByPk(spotId)

    const {ownerId} = spot

    if(userId !== ownerId) {
        return res.status(403).json(   {
            message: "Forbidden, user must be the owner of the spot",
            statusCode: 403
          })

    }

    await existingImage.destroy()
    return res.json(  {
        message: "Successfully deleted",
        statusCode: 200
      })
})



module.exports = router;
