var router = require('express').Router();
const { roomsController } = require('../controllers/rooms.controller');


router.post('/add', roomsController.addRoom);
router.post('/addUser', roomsController.userAdd);
router.get('/list', roomsController.roomsList);
router.post('/remove', roomsController.removeRoomRecord);
router.post('/multipleRoomRecordsRemove', roomsController.selectedRoomsRemove);
router.post('/update', roomsController.update);





module.exports = router;