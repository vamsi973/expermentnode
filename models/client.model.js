var db = require('mongodb');
const ObjectId = db.ObjectID;

const hotelModel = {

    insertCheckIn: (conn, note) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('check_in').insertOne(note);
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    todayCheckList: (conn, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('Rooms_list').aggregate(
                    [
                        {
                            $match: {
                                "branch_id": ObjectId("61aa45ebfafe836d9e6c4de6"),
                                $and: [
                                    { status: { $ne: 'available' } },
                                    { status: { $ne: 'maintenance' } }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: 'check_in', as: 'bookings',
                                let: { room: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$room_id', "$$room"] },
                                                    { $eq: ['$status', "open"] }
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        $project: {
                                            name: 1,
                                            address: 1,
                                            arrived_from: 1, company_name: 1, contact_no: 1, email: 1, nationality: 1, invoice_id: 1,
                                        }
                                    },

                                ],

                            }
                        },

                        {
                            $unwind: {
                                path: '$bookings', preserveNullAndEmptyArrays: false
                            }
                        },
                        {
                            $project: {
                                name: "$bookings.name",
                                invoice_id: "$bookings.invoice_id",
                                nationality: "$bookings.nationality",
                                email: "$bookings.email",
                                contact_no: "$bookings.contact_no",
                                company_name: "$bookings.company_name",
                                arrived_from: "$bookings.arrived_from",
                                address: "$bookings.address",
                                booking_id: '$bookings._id',
                                room_type: '$category',
                                room_no: '$room',
                                status: 1,
                                branch_id: 1,
                                room_id: '$_id'
                            }
                        }
                    ]
                ).toArray();
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    getAvailableRooms: async (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let rooms_list = await conn.collection('Rooms_list').find({ "branch_id": ObjectId("61aa45ebfafe836d9e6c4de6"), status: 'available' }).toArray();
                resolve(rooms_list);
            } catch (error) {
                reject(error)
            }
        });
    },
    getRooms: async (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let rooms_list = await conn.collection('Rooms_list').find({ "branch_id": ObjectId("61aa45ebfafe836d9e6c4de6") }).toArray();
                resolve(rooms_list);
            } catch (error) {
                reject(error)
            }
        });
    },

    updateRoomStatus: async (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let status = await conn.collection('Rooms_list').updateOne({ "_id": ObjectId(data.room_id) }, { $set: { status: data.status } });
            } catch (error) {
                reject(error)
            }
        })
    }

}

module.exports = hotelModel;


// db.check_in.aggregate([
//     {
//         $project: {
//             invoice_number: '$id',

//             GST_no: '',
//             customer_info: {
//                 contact_number: '$contact_no',
//                 email: '$email',
//                 address: '$address',
//                 name: '$name',
//                 company: '$company',
//             },
//             referance: {
//                 name: '$name',
//                 contact: '$contact_no',
//             },
//             user_stay_details: {
//                 check_in: "12/12/2020 6:00 PM",
//                 check_out: "12/12/2020 6:00 PM",
//                 billing_days: 1,
//                 extra_persons: 1,
//             },
//             my_bank_details: {
//                 "Account Number": "654545845455",
//                 "Bank Name": "HDFC",
//                 "Branch Name": "hyderabad",
//                 "IFSC code": "HDFC0004348",
//                 "Account Name": "vamsikrishna",
//             },
//             user_billing_details: {
//                 room_rent_charges: {
//                     tariff: 2400,
//                     amount: 2400,
//                     cgst: 144,
//                     sgst: 144,
//                     total: 2688,
//                     id: '155544',
//                     description: "Room Rent"
//                 },
//                 extra_person_charges: {
//                     tariff: 2400,
//                     amount: 2400,
//                     cgst: 144,
//                     sgst: 144,
//                     total: 2688,
//                     id: '155544',
//                     description: "Extra Person"
//                 },
//                 food_bill_charges: {
//                     tariff: 2400,
//                     amount: 2400,
//                     cgst: 144,
//                     sgst: 144,
//                     total: 2688,
//                     id: '155544',
//                     description: "Food Bill"
//                 },
//                 laundry_bill_charges: {
//                     tariff: 2400,
//                     amount: 2400,
//                     cgst: 144,
//                     sgst: 144,
//                     total: 2688,
//                     id: '155544',
//                     description: "Laundry"
//                 },
//             },
//         }
//     }
// ])