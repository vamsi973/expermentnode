var db = require('mongodb');
const ObjectId = db.ObjectID;

const clientModel = {

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

    allBookings: async (conn, query) => {
        return new Promise(async (resolve, reject) => {
            try {
                let rooms_list = await conn.collection('check_in').find(query).toArray();
                resolve(rooms_list);
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

    getAvailableRooms: async (conn, query) => {
        return new Promise(async (resolve, reject) => {
            try {
                let rooms_list = await conn.collection('rooms').find(query).toArray();
                resolve(rooms_list);
            } catch (error) {
                reject(error)
            }
        });
    },
    getRooms: async (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let rooms_list = await conn.collection('rooms_list').find({ "user_id": ObjectId("61aa45ebfafe836d9e6c4de6") }).toArray();
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

module.exports = clientModel;