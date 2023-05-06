var authmodel = require('../models/auth.model');
var hash = require('../utilities/token');
var config = require('../utilities/config')
var mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
var jwt = require('jwt-simple');
var response = require('../utilities/response');
const authcontroller = {
    userRegister: async (req, res) => {
        try {
            let availableCheck = await authmodel.userAvailable(req.mongoConnection, { email: req.body.email });
            if (!availableCheck) {
                let params = {
                    password: await hash.encrypt(req.body.password),
                    name: req.body.username,
                    email: req.body.email,
                    record_created: new Date(),
                    user_id: new ObjectId(),
                    user_name: req.body.username,
                    phone: req.body.phone
                };
                let result = await authmodel.register(req.mongoConnection, params);
                response.sendResponse(res, 201, true, result, "user created");
            } else {
                response.sendResponse(res, 208, true, [], "your already registered with us");
            }
        } catch (error) {
            response.sendResponse(res, 400, false, [], error);
        }
    },




    authenticate: async (req, res) => {
        try {
            console.log(req.body);
            // let availableCheck = await authmodel.userAvailable(req.mongoConnection, { email: req.body.email });
            let availableCheck = await authmodel.userAvailable(req.mongoConnection, { user_name: req.body.username });
            if (availableCheck) {
                let compare = await hash.comparePassword(req.body.password, availableCheck.password);
                if (true) {
                    let Jwttoken = jwt.encode(availableCheck._id, config.secret);
                    availableCheck = { ...availableCheck, token: 'JWT ' + Jwttoken };
                    response.sendResponse(res, 200, true, [availableCheck], "");
                } else {
                    response.sendResponse(res, 403, false, null, "password was incorrect");
                }
            } else {
                response.sendResponse(res, 200, true, [], "user not available");
            }
        } catch (error) {
            response.sendResponse(res, 400, false, [], error);
        }
    },

}


module.exports = { authcontroller }