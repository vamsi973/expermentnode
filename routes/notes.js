var router = require('express').Router();
const { notesController } = require('../controllers/notes.controller');
var tokenValidators = require('../middlewares/tokenValidator')

router.post('/createNote', notesController.creatingNote);
router.get('/notesList', notesController.listedNotes);



module.exports = router;