const express = require('express');
const categoriesController = require('../controllers/category.controller');
const { validatePostCategories } = require('../middlewares/validations/validateNewPost');
const { auth } = require('../middlewares/auth/ auth.middleware');

const router = express.Router();

router.post('/', auth, validatePostCategories, categoriesController.postCategories);
router.get('/', auth, categoriesController.getAllCategories);

// router.get('/:id', auth, userController.getOneUser);

module.exports = router;