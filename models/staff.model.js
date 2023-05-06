var db = require('mongodb');
const ObjectId = db.ObjectID;

const staffmodel = {

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

    staffList: (conn, userId) => {
        userId = Object.assign(userId,{is_deleted: { $exists: false }})
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('staff').find(userId).toArray();
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    },



}

module.exports = staffmodel 