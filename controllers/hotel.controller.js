var hotelModal = require('../models/hotel.model');
var hash = require('../utilities/token');
var config = require('../utilities/config')
var mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
var jwt = require('jwt-simple');
var excel = require('excel4node');
const upload = require('./../middlewares/upload');
const commn = require('../models/curd.model');
const response = require('../utilities/response');

const hotelController = {
    getAllBooking: async (req, res) => {
        try {
            let result = await hotelModal.allBookings(req.mongoConnection, {});
            res.send({ success: true, data: result });
        } catch (error) {

            res.send({ success: false, data: error });
        }
    },
    createBooking: async (req, res) => {
        try {
            console.log(req.body);

            let result = await hotelModal.insertCheckIn(req.mongoConnection, {
                invoice_id: req.invoiceToken,
                name: req.body.first + '.' + req.body.last,
                gender: req.body.gender,
                email: req.body.email,
                address: req.body.address,

                nationality: req.body.nationality,

                arrived_by: req.body.arrived_by,
                arrival_date: new Date(req.body.arrival_date),
                // arrived_from: req.body.arrived_from,

                departuer_date: new Date(req.body.departuer_date),

                company_name: req.body.company_name,
                designation: req.body.designation,

                contact_no: req.body.contact_no,
                purpose_of_visit: req.body.purpose_of_visit,

                proceeding_by: req.body.proceeding_by,

                // passport_expiry_date: new Date(req.body.passport_expiry_date),
                // passport_issue_date: new Date(req.body.passport_issue_date),
                // passport_no: req.body.passport_no,
                // passport_place: req.body.passport_place,

                // visa_expiry_date: new Date(req.body.visa_expiry_date),
                // visa_issued_date: new Date(req.body.visa_issued_date),
                // visa_no: req.body.visa_no,
                // visa_place: req.body.visa_place,

                room_id: ObjectId(req.body.room_id),
                advance_amount: parseFloat(req.body.advance_amount) || 0,
                payment: 'unpaid',
                room: {
                    _id: req.body.room_type._id,
                    room_no: req.body.room_type.room_no,
                    category: req.body.room_type.category,
                    rent: req.body.room_type.rent,
                    room_type: req.body.room_type.room_type,
                    room_capacity: req.body.room_type.room_capacity,
                },
                total_persons: req.body.total_persons,
                note: req.body.note,
                status: "open",
                client_id: req.user_id
            });
            if (result) {
                await commn.updateRecord(req.mongoConnection, { client_id: req.user_id, _id: ObjectId(req.body.room_type._id) }, {
                    room_status: "booked"
                }, false, "rooms")
            }
            res.send({ success: true, data: result });
            // await hotelModal.updateRoomStatus(req.mongoConnection, { room_id: ObjectId(req.body.room_id), status: 'occuiped' });
        } catch (error) {

            res.send({ success: false, data: error });
        }
    },

    todayCheckList: async (req, res) => {
        try {
            let result = await hotelModal.todayCheckList(req.mongoConnection, { user_id: ObjectId(req.user_id) });
            res.send({ success: true, data: result });
        } catch (error) {

            res.send({ success: false, data: error });
        }
    },

    getAvailableRooms: async (req, res) => {
        try {
            let result = await hotelModal.getAvailableRooms(req.mongoConnection, { client_id: req.user_id });
            res.send({ success: true, data: result });
        } catch (error) {

            res.send({ success: false, data: error });
        }
    },
    getRooms: async (req, res) => {
        try {
            let result = await commn.getAll(req.mongoConnection, { user_id: req.user_id }, 'rooms_list');
            response.sendResponse(res, 200, true, result, '');
        } catch (error) {

            response.sendResponse(res, 400, false, null, "something went wrong");
        }
    },

    updateBookingStatus: async (req, res) => {
        try {
            console.log(req.body, 56)
            let result = await commn.updateRecord(req.mongoConnection, { _id: ObjectId(req.body._id) }, {                     // Replacement document
                status: req.body.status,
                balance_amount: req.body.balance_amount,
                arrival_date: req.body.arrival_date,
                departuer_date: new Date(req.body.departuer_date),
                payment: req.body.payment,
                contact_no: req.body.contact_no,
                name: req.body.name
            }, false, 'check_in');
            res.send({ success: true, data: result });
        } catch (error) {

            res.send({ success: false, data: error });
        }
    },
    removeBookingRecord: async (req, res) => {
        try {

            let result = await commn.updateRecord(req.mongoConnection, { _id: ObjectId(req.body.id) }, {                     // Replacement document
                
                    is_deleted: true,
                 
            }, false,'check_in');
            res.send({ success: true, data: result });
        } catch (error) {
                console.log(error)
            res.send({ success: false, data: error });
        }
    },
    selectedBookingsRemove: async (req, res) => {
        try {
            let ids = req.body.id.map(id => ObjectId(id));
            let result = await commn.updateMany(req.mongoConnection, { _id: { $in: ids } }, {                     // Replacement document
                
                    is_deleted: true,
                
            }, false, 'check_in');
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },
}


module.exports = { hotelController }