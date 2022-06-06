const express = require('express');
const route = express.Router();
const postControllers = require('../controllers/postsControllers');

route.use(require('../middleware/verifyToken'));

route.route('/')
    .get(postControllers.getPosts)
    .post(postControllers.addPost);

route.route('/:id')
    .delete(postControllers.deletePost)
    .put(postControllers.updatePost);

module.exports = route;