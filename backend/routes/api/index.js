const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });
   
        
router.use(restoreUser);

module.exports = router;