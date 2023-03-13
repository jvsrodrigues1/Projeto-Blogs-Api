const express = require('express');
const { validateToken } = require('../middlewares/validateToken');
const { postsController } = require('../controllers/post.controller');

const router = express.Router();

router.post('/', validateToken, postsController.newPost);
router.get('/', validateToken, postsController.getPosts);
router.get('/search', validateToken, postsController.getQueryPost);
router.get('/:id', validateToken, postsController.getPost);
router.put('/:id', validateToken, postsController.updatePost);
router.delete('/:id', validateToken, postsController.deletePost);

module.exports = router;