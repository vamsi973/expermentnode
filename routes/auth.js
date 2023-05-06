var router = require('express').Router();
const { authcontroller } = require('../controllers/auth.controller');
var tokenValidators = require('../middlewares/tokenValidator')

router.post('/userRegister', authcontroller.userRegister);
router.post('/login', authcontroller.authenticate);


module.exports = router;