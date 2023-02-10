const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const {Op} = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    let allUserBookings = await Booking.findAll({
        where: {userId},
        include: {
            model: Spot,
            attributes: {exclude: ['createdAt', 'updatedAt']},
        },

    })

    allUserBookings = JSON.parse(JSON.stringify(allUserBookings))

    for(let booking of allUserBookings){

        let previewImage = await SpotImage.findOne({
            where: {[Op.and]: [{spotId: booking.Spot.id}, {preview:true}]}
        })

        booking.Spot.previewImage = previewImage.url
    };

    return res.json({Bookings: allUserBookings})

})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body
    const booking = await Booking.findByPk(bookingId)
    const userId = req.user.id;

    if(!booking){
        const err = new Error("Booking could not be found")
        err.status = 404
        console.log(err)
        return next(err)
    }

    const { spotId } = booking

    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    if(booking.userId !== userId){
        const err = new Error("You don't have access to change this booking")
        err.title = "Not authorized"
        err.status = 403
        return next(err)
    }
    if (new Date(startDate) > new Date(endDate)){
        const err = new Error("endDate cannot come before startDate")
        err.title = "Validation Error"
        err.status = 400
        return next(err)
    }
    if (Date.now() > new Date(endDate)){
        const err = new Error('Forbidden');
        err.status = 403
        err.error = {
            message: "Past bookings can't be modified"
        }

        return res.status(403).json(err)
    }

    const conflictsBooking = await Booking.findAll({
        where: {spotId}
      })

    for (let booking of conflictsBooking){

        if(+bookingId === booking.id) {
            continue
        }

        const bookedStart = booking.startDate.getTime();
        const bookedEnd = booking.endDate.getTime();
        const errors = [];


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


    booking.startDate = startDate;
    booking.endDate = endDate;
    const resBody = await booking.save()
    return res.json(resBody)

})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;


    const currentUserId = req.user.id;

    let booking = await Booking.findByPk(bookingId);

    if (!booking){
        const err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }

    let { spotId, userId } = booking

    let now = new Date()

    if(new Date(booking.startDate) <= now){
        const err = new Error("Bookings that have been started can't be deleted")
        err.title = "Forbidden"
        err.status = 403
        return next(err)
    }

    let spot = await Spot.findByPk(spotId)

    let { ownerId } = spot

    if (currentUserId === ownerId || currentUserId === userId) {
        await booking.destroy();
        return res.json({
          message: "Successfully deleted",
          statusCode: 200
        })
    } else {
        const err = new Error("You are not authorized to delete this booking.")
        err.status = 403
        return next(err)
    }

})




















module.exports = router;
