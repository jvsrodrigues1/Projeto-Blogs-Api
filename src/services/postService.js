const { Sequelize } = require('sequelize');
const { BlogPost, Category, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const findIfCategoryExists = async (cat) => {
  const categories = await Promise.all(
    cat.map(async (id) => Category.findByPk(id)),
  );
  if (categories.some((id) => !id)) return false;
  return true;
};

const insertNewPostCategory = async (categoryIds, postId, t) => {
  await Promise.all(categoryIds
    .map(async (categoryId) => PostCategory.create({ postId, categoryId },
      { transaction: t })));
};

const createNewPost = async ({ title, content, userId, categoryIds }) => {
  const hasCategories = await findIfCategoryExists(categoryIds);
  if (!hasCategories) {
    return { type: 'BAD_REQUEST', message: 'one or more "categoryIds" not found' };
  }
  try {
    const newPost = await sequelize.transaction(async (t) => {
      const post = await BlogPost
        .create({ title, content, userId, published: Date.now(), updated: Date.now() },
          { transaction: t });
      await insertNewPostCategory(categoryIds, post.id, t);
      return post;
    });
    return { type: null, message: newPost };
  } catch (err) {
    return { type: 'BAD_REQUEST', message: err.message };
  }
};

module.exports = {
  createNewPost,
}; 