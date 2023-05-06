var db = require('mongodb');
const ObjectId = db.ObjectID;

const budgetModel = {

    insertSpending: (conn, note) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('budget').insertOne(note);
                resolve(result);
            } catch (error) {   
                
                reject(error)
            }
        });
    },

    budgetSummary: (conn, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('budget').find(userId).toArray();
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    spendingTypes:  (conn) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('dropdownoptions').find({}).toArray();
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    getTAGS:  (conn) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('TAGS').find({}).toArray();
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },


}

module.exports = budgetModel; 