const { Category } = require('../models');
const { isNewCategoryValid } = require('../middlewares/validations/newCategory');

const createCategory = async ({ name }) => {
  const error = await isNewCategoryValid(name);
  if (error.type) return error;
  
  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory };
};

const getCategories = async () => {
  const categories = await Category.findAll();

  return { type: null, message: categories };
};

module.exports = {
  createCategory,
  getCategories,
};
