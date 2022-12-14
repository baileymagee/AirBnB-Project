const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
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

  router.use('/session', sessionRouter);

  router.use('/users', usersRouter);

  router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });
  
module.exports = router;
