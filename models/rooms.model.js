var db = require('mongodb');
const ObjectId = db.ObjectID;

const roomsmodel = {

    addStaff: (conn, note) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('staff').insertOne(note);
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    },

    roomsList: (conn, userId) => {
        userId = Object.assign(userId,{is_deleted: { $exists: false }})
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('rooms').find(userId).toArray();
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    },



}

module.exports = roomsmodel 