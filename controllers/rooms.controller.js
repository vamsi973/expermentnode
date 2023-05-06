var roomsModal = require('../models/rooms.model');
const ObjectId = require('mongodb').ObjectID;
const commn = require('../models/curd.model');
var hash = require('../utilities/token');
const roomsController = {
    addRoom: async (req, res) => {
        try {
            console.log(req.body, 757);
            let record = {
                client_id: req.user_id,
                room_no: req.body.room_no,
                category: req.body.category,
                room_type: req.body.room_type,               
                rent:parseFloat(req.body.rent),
                room_capacity: parseInt(req.body.room_capacity),
                record_created_at: new Date(),
            };
            const insertedRecord = await commn.createRecord(req.mongoConnection, record, 'rooms')
            res.send({ success: true, data: insertedRecord });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },
    userAdd: async (req, res) => {
        try {
            console.log(req.body, 757);
            let record = {
                name: req.body.first + "-" + req.body.last,
                gender: req.body.gender,
                contact_no: req.body.mobile,
                email: req.body.email,
                designation: req.body.designation,
                address: req.body.address,
                client_id: req.user_id,
                joining_date: new Date(req.body.joining_date) || new Date(),
                dob: new Date(req.body.dob),
                salary: parseFloat(req.body.salary) || null,
                qualification: req.body.education || null,
                record_created_at: new Date(),
                department: req.body.department || null,
            };
            const insertedRecord = await commn.createRecord(req.mongoConnection, record, 'staff')
            const userInsert = await commn.createRecord(req.mongoConnection, {
                "password": await hash.encrypt(req.body.password),
                "name": req.body.first + "-" + req.body.last,
                "email": req.body.email,
                "record_created": new Date(),
                "client_id": req.user_id,
                "user_name": req.body.first + "-" + req.body.last,
                "phone": req.body.mobile,
            }, 'users')
            res.send({ success: true, data: insertedRecord });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },
    roomsList: async (req, res) => {
        try {
            let result = await roomsModal.roomsList(req.mongoConnection, { client_id: ObjectId(req.user_id) });
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },

    removeRoomRecord: async (req, res) => {
        try {

            let result = await commn.updateRecord(req.mongoConnection, { _id: ObjectId(req.body.id) }, {                     // Replacement document
                
                    is_deleted: true,
                    
                
            }, false,'rooms');
            res.send({ success: true, data: result });
        } catch (error) {
            console.log(error,80);
            res.send({ success: false, data: error });
        }
    },
    selectedRoomsRemove: async (req, res) => {
        try {
            let ids = req.body.id.map(id => ObjectId(id));
            let result = await commn.updateMany(req.mongoConnection, { _id: { $in: ids } }, {                     // Replacement document
                
                    is_deleted: true,
                    record_updated_date: new Date()
                
            }, false, 'rooms');
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },

    update: async (req, res) => {
        try {
            console.log(req.body, 56)
            let result = await commn.updateRecord(req.mongoConnection, { _id: ObjectId(req.body._id) }, {                     // Replacement document
                
                    room_no: req.body.room_no,
                    category: req.body.category,
                    room_type: req.body.room_type,               
                    rent:parseFloat(req.body.rent),
                    room_capacity: parseInt(req.body.room_capacity),
                    
                
            }, false, 'rooms');
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },



}


module.exports = { roomsController }