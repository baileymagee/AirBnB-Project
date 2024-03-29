const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookingsRouter = require('./bookings.js')
const reviewsRouter = require('./reviews.js')
const spotImagesRouter = require('./spot-images.js')
const reviewImagesRouter = require('./review-images.js')
const { restoreUser } = require("../../utils/auth.js");


router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

  const { setTokenCookie } = require('../../utils/auth.js');
  const { User } = require('../../db/models');
  router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
          username: 'Demo-lition'
        }
      });
    setTokenCookie(res, user);
    return res.json({ user: user });
  });

  router.use(restoreUser);

  router.use('/spots', spotsRouter);

  router.use('/reviews', reviewsRouter);

  router.use('/session', sessionRouter);

  router.use('/spot-images', spotImagesRouter);

  router.use('/review-images', reviewImagesRouter)

  router.use('/users', usersRouter);

  router.use('/bookings', bookingsRouter);

  router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });

module.exports = router;
