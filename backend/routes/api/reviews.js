const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const {Op} = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    let Reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {model:Spot,
                    include: {model:SpotImage, as: 'previewImage',
                    attributes: ['url'],
                    group: ['previewImage.url']
                },
            },
            {model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    Reviews = JSON.parse(JSON.stringify(Reviews))

    for (let review of Reviews) {
        review.Spot.previewImage = review.Spot.previewImage.url
    }

    return res.json({Reviews})
})

const validateCreateReview = [
    check('review')
    .exists({checkFalsy:true})
    .withMessage('Review text is required'),
    check('stars')
    .exists().withMessage('Stars are required')
    .isInt({min:1, max: 5}).withMessage('Stars must be an integer from 1 to 5'),

    handleValidationErrors
  ]

// Edit a Review
router.put('/:reviewId', requireAuth, validateCreateReview, async (req, res, next) => {
    const {reviewId} = req.params;
    const {review, stars} = req.body;
    const userId = req.user.id;

    const reviewToEdit = await Review.findByPk(reviewId)

    if(!reviewToEdit) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if(reviewToEdit.userId !== userId) {
        const err = new Error("You don't have access to change this booking")
        err.title = "Not authorized"
        err.status = 403
        return next(err)
    }

    reviewToEdit.review = review;
    reviewToEdit.stars = stars;
    const resBody = await reviewToEdit.save()
    return res.json(resBody)

})

// Delete a Review

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const {reviewId} = req.params;
    const userId = req.user.id;

    const reviewToDelete = await Review.findByPk(reviewId)

    if(!reviewToDelete) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if(reviewToDelete.userId !== userId) {
        const err = new Error("You don't have access to change this booking")
        err.title = "Not authorized"
        err.status = 403
        return next(err)
    } else {
        await reviewToDelete.destroy();
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }


})




module.exports = router;
