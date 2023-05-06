var router = require('express').Router();
const { staffController } = require('../controllers/staff.controller');


router.post('/add', staffController.addStaff);
router.post('/addUser', staffController.userAdd);
router.get('/list', staffController.staffList);
router.post('/remove', staffController.removeStaffUser);
router.post('/multipleStafUsersRemove', staffController.selectedStaffRemove);
router.post('/update', staffController.update);





module.exports = router;