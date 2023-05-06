var db = require('mongodb');
const ObjectId = db.ObjectID;

const authmodel = {

    createNote: (conn, note) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('notes').insertOne(note);
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    listedNotes: (conn, userId) => {
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

module.exports = authmodel 