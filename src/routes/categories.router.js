const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const { validatePostCategories } = require('../middlewares/validations/inputValidations');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, validatePostCategories, categoriesController.postCategories);
router.get('/', auth, categoriesController.getAllCategories);

// router.get('/:id', auth, userController.getOneUser);

module.exports = router;