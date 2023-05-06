var budgetModal = require('../models/budget.model');
var hash = require('../utilities/token');
var config = require('../utilities/config')
var mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
var jwt = require('jwt-simple');
var excel = require('excel4node');

const budgetController = {

    insertSpending: async (req, res) => {
        try {
            console.log(req.body);
            let params = {
                title: req.body.title,
                investType: req.body.spendingType,
                amount: parseFloat(req.body.amount),
                user_id: req.user_id,
                tag:req.body.tag,
                repayment: new Date(req.body.repayment),
                description: req.body.description,
                record_created: new Date()
            };
            let result = await budgetModal.insertSpending(req.mongoConnection, params);
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },

    budgetSummary: async (req, res) => {
        try {
            let result = await budgetModal.budgetSummary(req.mongoConnection, { user_id: ObjectId(req.user_id) });
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },
    getTypesofSpendings : async (req, res) => {
        try {
            let result = await budgetModal.spendingTypes(req.mongoConnection);
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },

    getTAGS: async (req, res) => {
        try {
            let result = await budgetModal.getTAGS(req.mongoConnection);
            res.send({ success: true, data: result });
        } catch (error) {
            
            res.send({ success: false, data: error });
        }
    },



}


module.exports = { budgetController }