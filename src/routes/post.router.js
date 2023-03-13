const express = require('express');
const postController = require('../controllers/post.controller');
const {
  validatePostPost, validatePutPost,
} = require('../middlewares/validations/validateNewPost');
const { auth } = require('../middlewares/auth/ auth.middleware');

const router = express.Router();

router.post('/', auth, validatePostPost, postController.postPost);
router.get('/', auth, postController.getAllPost);

router.get('/search', auth, postController.getQueryPost);

router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, validatePutPost, postController.putPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;