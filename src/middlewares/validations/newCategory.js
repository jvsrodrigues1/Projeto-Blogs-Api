const { Category } = require('../../models');

const { addCategory, validateCategory } = require('./schemas');

const isNewCategoryValid = async (name) => {
  const { error } = addCategory.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  const categoryExists = await Category.findOne({ where: { name } });
  if (categoryExists) return { type: 'CATEGORY_EXISTS', message: 'Category already registered' };
  
  return { type: null, message: '' };
};

const categoryValidation = (name) => {
  const { error } = validateCategory.validate({ name });
  if (error) throw Object({ status: 400, message: error.message });
};

module.exports = {
  isNewCategoryValid,
  categoryValidation,
};