var depatmentModal = require('../models/department.model');
var mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
const curdModel = require('../models/curd.model');
const departmentController = {
    addDepartment: async (req, res) => {
        try {
            let params = {
                department: req.body.dName,
                department_head: req.body.hod,
                contact_no: req.body.phone,
                email: req.body.email,
                totalStaff: req.body.totalStaff,
                details: req.body.details,
            };
            let departments = await curdModel.createRecord(req.mongoConnection, params, 'departments');
            res.send({ success: true, data: departments });
        } catch (error) {
            res.send({ success: false, data: error });
        }
    },

    staffList: async (req, res) => {
        try {
            let result = await depatmentModal.staffList(req.mongoConnection, { user_id: ObjectId(req.user_id) });
            res.send({ success: true, data: result });
        } catch (error) {
            res.send({ success: false, data: error });
        }
    },



}


module.exports = { departmentController }