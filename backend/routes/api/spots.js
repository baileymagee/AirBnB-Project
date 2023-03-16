const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const {Op, where} = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
  const {spotId} = req.params

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    return res.status(404).json( {
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const Reviews = await Review.findAll({
    where: {spotId: +spotId},
    include: [
      {model:User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {model: ReviewImage,
        attributes: ['id', 'url']}
    ]
  })
  return res.json({Reviews})
})

//Get all Bookings for a Spot ased on Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const {spotId} = req.params;
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
  }

  const {ownerId} = spot

  if (req.user.id === ownerId){
    const Bookings = await Booking.findAll({
      where: {spotId: spot.id},
      include: {
        model:User,
        attributes: ['id','firstName','lastName']
      }
    })
    return res.json({Bookings});
  }

  const Bookings = await Booking.findAll({
    where: {spotId: spot.id},
    attributes: ['spotId', 'startDate', 'endDate']
  })
  return res.json({Bookings})

})

//Get All Spots owned by the Current User
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

//Get details for a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const {spotId} = req.params;

    let spot = await Spot.findByPk(+spotId)

    if (!spot) {
        return res.json(    {
            message: "Spot couldn't be found",
            statusCode: 404
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

const validateQuery = [
  check("page")
      .optional({ nullable: true })
      .isInt({ min: 1 })
      .withMessage("Page must be greater than or equal to 1"),
  check("size")
      .optional({ nullable: true })
      .isInt({ min: 1 })
      .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
      .optional({ nullable: true })
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
  check("minLat")
      .optional({ nullable: true })
      .isDecimal()
      .withMessage("Minimum latitude is invalid"),
  check("maxLng")
      .optional({ nullable: true })
      .isDecimal()
      .withMessage("Maximum longitude is invalid"),
  check("minLng")
      .optional({ nullable: true })
      .isDecimal()
      .withMessage("Minimum longitude is invalid"),
  check("minPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Minimum price must be greater or equal to 0"),
  check("maxPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Maximum price must be greater or equal to 0"),
  handleValidationErrors
];

//Get All Spots
router.get('/', validateQuery, async (req, res, next) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

    page = +page
    size = +size

    // console.log(page)
    console.log(typeof page)
    console.log(typeof size)

    if(isNaN(page)){
      page = 1
    }

    if(isNaN(size)){
      size = 20
    }

    if (page > 10) {
      page = 10
    }

    if (size > 20){
      size = 20
    }

    limit = size
    offset = size * (page - 1)

    let where = {}

    if(!isNaN(minLat) && !isNaN(maxLat)){
      where.lat = {[Op.and]: [
        {[Op.gte]: minLat},
        {[Op.lte]: maxLat}
      ]}
    }
    else if (!isNaN(minLat)) {
      where.lat = {[Op.gte]: minLat}
    }
    else if (!isNaN(maxLat)) {
      where.lat = {[Op.lte]: maxLat}
    }

    if(!isNaN(minLng) && !isNaN(maxLng)) {
      where.lng = {[Op.and]: [
        {[Op.gte]: minLng},
        {[Op.lte]: maxLng}
      ]}
    }
    else if (!isNaN(minLng)) {
      where.lng = {[Op.gte]: minLng}
    }
    else if (!isNaN(maxLng)) {
      where.lng = {[Op.lte]: maxLng}
    }



    if(!isNaN(minPrice) && !isNaN(maxPrice)){
      where.price = {[Op.between]: [minPrice, maxPrice]}
    }
    else if(!isNaN(minPrice)) {
      where.price = {[Op.gte]: minPrice}
    }
    else if(!isNaN(maxPrice)) {
      where.price = {[Op.lte]: maxPrice}
    }



    const spots = await Spot.findAll({
      where,
      limit,
      offset
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

    return res.json({Spots, page, size})
})

const validateCreateAndEditSpot = [
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
    // check('lat')
    //   .exists({checkFalsy: true})
    // //   .notEmpty()
    //   .withMessage('Latitude is required')
    //   .isDecimal()
    //   .withMessage('Latitude is not valid'),
    // check('lng')
    //   .exists({checkFalsy: true})
    // //   .notEmpty()
    //   .withMessage('Longitude is required')
    //   .isDecimal()
    //   .withMessage('Longitude is not valid'),
    check('name')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .withMessage('Name is required')
      .isLength({max:49})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({checkFalsy: true})
    //   .notEmpty()
      .isLength({min:30})
      .withMessage('Description is required'),
    check('price')
      .exists({checkFalsy: true})
      .isInt({min: 1})
      .withMessage('Price per day is required'),

    handleValidationErrors
];

const validateCreateReview = [
  check('review')
  .exists({checkFalsy:true})
  .withMessage('Review text is required'),
  check('stars')
  .exists().withMessage('Stars are required')
  .isInt({min:1, max: 5}).withMessage('Stars must be an integer from 1 to 5'),

  handleValidationErrors
]



// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const {spotId} = req.params;
  const userId = req.user.id

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    return res.status(404).json( {
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const {ownerId} = spot

  if(userId !== ownerId) {
    const err = new Error("Forbidden")
    err.status = 403
    return next(err)
  }

  const {url, preview} = req.body

  const newImage = await SpotImage.create({
    spotId: +spotId,
    url,
    preview,
  })

  const returnNewImage = {id: newImage.id, url: newImage.url, preview: newImage.preview}

  return res.json(returnNewImage)

})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateCreateReview, async (req, res, next) => {
  const {review, stars} = req.body
  const {spotId} = req.params
  const userId = req.user.id

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    return res.status(404).json( {
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const existingReview = await Review.findOne({
    where: {[Op.and]: [{userId}, {spotId: +spotId}]}
  })

  if (existingReview){
    return res.status(403).json( {
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }

  let newReview = await Review.create({
    userId,
    spotId: +spotId,
    review,
    stars
  })

  return res.json(newReview);

})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
      const err = new Error("Spot could not be found")
      err.status = 404
      console.log(err)
      return next(err)
    }

    const { ownerId } = spot;

    if(ownerId === userId) {
      const err = new Error("Forbidden, owner can't create a booking for their own spot.")
      err.status = 403
      return next(err)
    }
    // TODO OTHER 403 BOOKING CONFLICTS
    const conflictsBooking = await Booking.findAll({
      where: {spotId: spotId}
    })

    const {startDate, endDate} = req.body;

    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    for (let booking of conflictsBooking){
      const bookedStart = booking.startDate.getTime();
      const bookedEnd = booking.endDate.getTime();
      const errors = [];
      // Startdate is between bookstart and bookend
      if (bookedStart <= start && bookedEnd >= start){
        errors.push("Start date conflicts with an existing booking")
      }

      if (bookedStart <= end && bookedEnd >= end) {
        errors.push("End date conflicts with an existing booking")
      }

      if (bookedStart <= start && bookedEnd >= end){
        errors.push('Attempted booking inside of another booking')
      }

      if (bookedStart >= start && bookedEnd <= end) {
        errors.push('There is already a booking inbetween these dates already')
      }

      if(errors.length){
        const err = new Error ("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = errors
        return res.status(403).json(err)
      }
    }


    if(start >= end) {
      const err = new Error("Validation error")
      err.status = 400
      err.error = {
        endDate: "endDate cannot come before startDate"
      }
      return next(err)
    }

    const newBooking = await Booking.create(
      {spotId: +spotId,
      userId,
      startDate,
      endDate}
    )
    return res.json(newBooking);

})


//Create a Spot
router.post('/', requireAuth, validateCreateAndEditSpot, async (req, res, next) => {
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

//Edit a Spot
router.put('/:spotId', requireAuth,validateCreateAndEditSpot, async (req, res, next) => {
const { spotId } = req.params;
const { address, city, state, country, lat, lng, name, description, price} = req.body;
const spot = await Spot.findByPk(+spotId);
const userId = req.user.id;

if(!spot){
  const err = new Error("Spot could not be found")
  err.status = 404
  console.log(err)
  return next(err)
}
const {ownerId} = spot;

if(userId !== ownerId) {
  const err = new Error("Forbidden")
  err.status = 403
  return next(err)
} else {
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  await spot.save()
  return res.json(spot)
}

})

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  const userId = req.user.id;

  if(!spot){
    const err = new Error("Spot could not be found")
    err.status = 404
    return next(err)
  }


  const {ownerId} = spot

  if(userId !== ownerId) {
    const err = new Error("Forbidden")
    err.status = 403
    return next(err)
  }

  await spot.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})


module.exports = router;
