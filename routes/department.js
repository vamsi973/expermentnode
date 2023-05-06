var router = require('express').Router();
const { departmentController } = require('../controllers/department.controller');


router.post('/add', departmentController.addDepartment);
router.get('/', departmentController.staffList);


module.exports = router;