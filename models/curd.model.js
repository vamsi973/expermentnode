var ObjectId = require('mongodb').ObjectID;


const curdModel = {

    createRecord: (conn, data, collectionName) => {
        return new Promise(async (resolve, reject) => {
            try {
                data['record_created_at'] = new Date();
                const result = await conn.collection(collectionName).insertOne(data);
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    getAll: (conn, query, collectionName) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection(collectionName).find(query).toArray();
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },

    findRecord: (conn, query, collectionName) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(collectionName, query)
                const result = await conn.collection(collectionName).findOne(query);
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    },
    updateRecord:(conn, query,updateData,upsertValue ,collectionName) => {
        return new Promise(async (resolve, reject) => {
            try {
                updateData ={...updateData,record_updated_at:new Date()}
                upsertValue = upsertValue || false;
                const result = await conn.collection(collectionName).update(query,{                     // Replacement document
                    $set: updateData
                },upsertValue);
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    },
    updateMany:(conn, query,updateData,upsertValue ,collectionName) => {
        return new Promise(async (resolve, reject) => {
            try {
                upsertValue = upsertValue || false;
                const result = await conn.collection(collectionName).update(query,updateData,upsertValue);
                resolve(result);
            } catch (error) {
                
                reject(error)
            }
        });
    }

}

module.exports = curdModel 