const express = require('express');
const route = express.Router();
const userControllers = require('../controllers/userControllers');


route.post('/register', userControllers.registerUser);
route.post('/login', userControllers.loginUser);

route.use(require('../middleware/verifyToken'));

route.get('/profile', userControllers.getUser);

route.route('/:username')
    .put(userControllers.updateUser)
    .delete(userControllers.deleteUser)

module.exports = route;