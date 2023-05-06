var router = require('express').Router();
const { clientController } = require('../controllers/client.controller');

router.post('/addBranch',  clientController.createBracnch);
router.post('/addRoom',  clientController.createRoom);
router.get('/getRooms', clientController.getRooms);



module.exports = router;    