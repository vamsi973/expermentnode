var notesModal = require('../models/notes.model');
var hash = require('../utilities/token');
var config = require('../utilities/config')
var mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
var jwt = require('jwt-simple');
const notesController = {


    creatingNote: async (req, res) => {
        try {
            console.log(req.body);
            let params = {
                title: req.body.title,
                url: req.body.url,
                record_created: new Date(),
                user_id: req.user_id,
            };
            let result = await notesModal.createNote(req.mongoConnection, params);
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },

    listedNotes: async (req, res) => {
        try {
            let result = await notesModal.listedNotes(req.mongoConnection, { user_id: ObjectId(req.user_id) });
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },



}


module.exports = { notesController }