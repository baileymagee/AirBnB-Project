const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const spot = require('../../db/models/spot');
const {Op} = require('sequelize')
const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    
})


router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({})

    const Spots = [];
    for (let frozenSpot of spots) {
        const spot = JSON.parse(JSON.stringify(frozenSpot))
        const reviews = await Review.findAll({
            where: {spotId: spot.id}
        })

        let avg = 0;

        for (let rev of reviews) {
            avg += rev.stars
        }
        console.log(avg)

        if (reviews.length){
            spot.avgRating = avg/reviews.length
        } else {
            spot.avgRating = 0
        }

        const previewImage = await SpotImage.findOne({
            where: {
                [Op.and]: [{spotId: spot.id}, {preview:true}]
            }
        })

        if(previewImage){
            const {url} = previewImage;
            spot.previewImage = url
        } else {
            spot.previewImage = null
        }

        Spots.push(spot)
    }

    return res.json({Spots})
})




module.exports = router;
