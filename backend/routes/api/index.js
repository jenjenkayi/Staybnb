const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');


const spotsRouter = require('./spots.js')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use(restoreUser);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;