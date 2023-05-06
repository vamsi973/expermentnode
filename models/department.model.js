var db = require('mongodb');
const ObjectId = db.ObjectID;

const departmentmodel = {

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
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('notes').find(userId).toArray();
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },



}

module.exports = departmentmodel 