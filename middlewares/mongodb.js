const MongoClient = require('mongodb').MongoClient;
// const config = require('../utilities/config');

require('dotenv').config()



Server = require('mongodb').Server;
module.exports = async function () {
    return new Promise(async (resolve, reject) => {
        let database = await connect()
        resolve(database);
    })
}

connect = () => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(process.env.db_url);
            const client = new MongoClient(process.env.db_url);
            await client.connect();
            const db = client.db('hotel');
            resolve(db)
        } catch (error) {
            console.log("error from connection", error);
            process.exit(1);
            resolve(false)
        }

        // client.connect(config.db_url, { useNewUrlParser: true, useUnifiedTopology: true }, {
        //     // useNewUrlParser: true,
        // }, async (err, client) => {
        //     if (err) {
        //         console.log("error from connection", err);
        //         process.exit(1);
        //         resolve(false)
        //     } else {
        //         mongoConnection = client.db('hotel');
        //         resolve(mongoConnection)
        //     }
        // })
    })
}

