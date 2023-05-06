var clientModal = require('../models/hotel.model');
var ObjectID = require('mongodb').ObjectID;
const common = require('../models/curd.model');
const { json } = require('body-parser');
const response = require('../utilities/response');

const clientController = {

    createBracnch: async (req, res) => {
        try {
            let record = {
                hotel_name: req.body.hotel_name,
                hotel_address: req.body.hotel_address,
                rooms: req.body.rooms,
                user_id: req.user_id,
                hotel_id: new ObjectID(),
                status: req.body.status
            };
            console.log(record, 15)
            let result = await common.createRecord(req.mongoConnection, record, 'clients');
            res.send({ success: true, data: result });
            // await clientModal.updateRoomStatus(req.mongoConnection, { room_id: ObjectId(req.body.room_id), status: 'occuiped' });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },

    createRoom: async (req, res) => {
        try {
            let findRecord = await common.findRecord(req.mongoConnection, { user_id: ObjectID(req.user_id), room_id: req.body.room_id }, 'rooms_list');
            if (findRecord && Object.keys(findRecord).length > 0) {
                return response.sendResponse(res, 200, true, null, 'Room already exist',);
            }
            let record = {
                "user_id": req.user_id,
                "room_id": req.body.room_id,
                "room_status": req.body.status || 'available',
                "category": req.body.category,
                "occupancy": parseInt(req.body.occupancy),
                "price": parseFloat(req.body.price),
                "discount": parseFloat(req.body.discount),
                "facilities": req.body.facilities || ["hotwater", "wifi", "tv"],
                "floor_level": parseInt(req.body.floor_level)
            };
            let created_record = await common.createRecord(req.mongoConnection, record, 'rooms_list');
            response.sendResponse(res, 201, true, created_record, 'record created',);

        } catch (error) {
            
            response.sendResponse(res, 400, false, null, 'something went wrong',);
        }
    },


    getRooms: async (req, res) => {
        try {
            let result = await clientModal.getRooms(req.mongoConnection, {});
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },
}


module.exports = { clientController }