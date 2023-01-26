const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const {Op} = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const spots = await Spot.findAll({
        where: {ownerId: userId}
    })

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

router.get('/:spotId', async (req, res, next) => {
    const {spotId} = req.params;

    let spot = await Spot.findByPk(+spotId)

    if (!spot) {
        return res.json(    {
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    spot = JSON.parse(JSON.stringify(spot))

    const reviews = await Review.findAll({
        where: {spotId: spot.id}
    })
    spot.numReviews = reviews.length;

    let avg = 0;

    for (let rev of reviews) {
        avg += rev.stars
    }

    if (reviews.length){
        spot.avgRating = avg/reviews.length
    } else {
        spot.avgRating = 0
    }

    spot.SpotImages = await SpotImage.findAll({
        where: {spotId: spot.id},
        attributes: {exclude:['createdAt', 'updatedAt', 'spotId']}
    })

    spot.Owner = await User.findByPk(
        spot.ownerId,
        {attributes: {exclude: ['username']}}
        )



    return res.json(spot)
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

const validateCreateSpot = [
    check('address')
      .exists({ checkFalsy: true })
    //   .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
    //   .notEmpty()
      .withMessage('City is required'),
    check('state')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .withMessage('State is required'),
    check('country')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .withMessage('Latitude is required')
      .isDecimal()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .withMessage('Longitude is required')
      .isDecimal()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .withMessage('Name is required')
      .isLength({max:49})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .withMessage('Description is required'),
    check('price')
      .exists({checkFalsy: true})
      .withMessage('Price per day is required'),

    handleValidationErrors
];

router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {
 const ownerId = req.user.id;

 const {address, city, state, country, lat, lng, name, description, price} = req.body

 let newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
 })
 return res.json(newSpot)

})



module.exports = router;
