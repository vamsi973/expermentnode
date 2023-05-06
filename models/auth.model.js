var db = require('mongodb');
const ObjectId = db.ObjectID;

const authmodel = {

    userAvailable: async (conn, findObj) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(findObj,9000)
                const result = await conn.collection('users').findOne(findObj);
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    register: (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const insertedRecord = await conn.collection('users').insertOne(data);
                resolve(insertedRecord);
            } catch (error) {
                reject(error)
            }
        });
    },
    userData: (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('users').findOne(data);
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    },


}

module.exports = authmodel