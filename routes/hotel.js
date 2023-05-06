var router = require('express').Router();
const { hotelController } = require('../controllers/hotel.controller');
const invoice = require('../middlewares/invoiceToken');
const upload = require('./upload');
router.post('/insertCheckin', invoice.invoiceToken, hotelController.createBooking);
router.get('/dashboard', hotelController.todayCheckList);
router.get('/all', hotelController.getAllBooking);
router.get('/getAvailableRooms', hotelController.getAvailableRooms);
router.get('/getRooms', hotelController.getRooms);
router.post('/updateBookingStatus', hotelController.updateBookingStatus);
router.post('/remove', hotelController.removeBookingRecord);
router.post('/multipleStafUsersRemove', hotelController.selectedBookingsRemove);


module.exports = router;    