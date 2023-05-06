const tokenService = require('../utilities/headerSecurity');
const auth = require('../models/auth.model')
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
const MongoClient = require('mongodb').MongoClient;

// var jwt = require('jwt-simple');

const tokenValidator = {
    decodeToken: async (req, res, next) => {
        const decodedInfo = await tokenService.decodeToken(req.headers);
        if (!decodedInfo) {
            res.send({ success: false, msg: "Invalid Authorization!" });
        } else {
            client = await auth.userData(req.mongoConnection, { _id: ObjectId(decodedInfo) });
            if(!client){
                return res.send({ success: false, msg: "Invalid Authorization!" });
            }
            req.user_name = client.name;
            req.lastName = client.lastName;
            req.email = client.email;
            req.user_id = client.user_id || client.userId;
            next();
        }
    }
}
module.exports = { tokenValidator }

