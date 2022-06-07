const express = require('express');
const route = express.Router();
const notesControllers = require('../controllers/notesControllers');

route.use(require('../middleware/verifyToken'));

route.route('/')
    .get(notesControllers.getNotes)
    .post(notesControllers.addNote);

route.route('/:id')
    .delete(notesControllers.deleteNote)
    .put(notesControllers.updateNote);

module.exports = route;