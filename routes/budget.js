var router = require('express').Router();
const { budgetController } = require('../controllers/budget.controller');


router.post('/insertSpending', budgetController.insertSpending);
router.get('/budgetSummary', budgetController.budgetSummary);
router.get('/getSpendingList', budgetController.getTypesofSpendings);
router.get('/getTAGS', budgetController.getTAGS);

module.exports = router;    