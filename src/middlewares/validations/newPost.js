const { Category, BlogPost, User } = require('../../models');
const { addPostSchemas, validateUpdatePost } = require('./schemas');

const validateNewPost = async (title, content, categoryIds) => {
  const { error } = addPostSchemas.validate({ title, content, categoryIds });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const post = await Promise.all(
    categoryIds.map(async (id) => Category.findOne({ where: { id } })),
  );
  if (post.some((categoryId) => categoryId === null)) {
    return { type: 'CATEGORY_NOT_FOUND', message: 'one or more "categoryIds" not found' };
  }

  return { type: null, message: '' };
};

const updatePostValidation = async (title, content) => {
  const { error } = validateUpdatePost.validate({ title, content });
  if (error) throw Object({ status: 400, message: 'Some required fields are missing' });
};

const checkCategory = async (arrayCategory) => {
  const check = arrayCategory.map((id) => Category.findOne({ where: { id } }));
  const promiseResolved = await Promise.all(check);
  promiseResolved.forEach((e) => {
    if (!e) throw Object({ status: 400, message: 'one or more "categoryIds" not found' });
  });
};

const checkPosts = async (postId) => {
  const check = await BlogPost.findOne({ where: { id: postId } });
  if (!check) throw Object({ status: 404, message: 'Post does not exist' });
};

const getUserIdPost = async (postId) => {
  const getPost = await BlogPost.findOne({ where: { id: postId } });
  
  return getPost.dataValues.userId;
};

const checkUserAbleToEdit = async (userEmail, postId) => {
 const userPostId = await getUserIdPost(postId);
 const userId = await User.findOne({ where: { email: userEmail } });
 if (userId.dataValues.id !== userPostId) {
 throw Object({ 
  status: 401,
   message: 'Unauthorized user' }); 
}
};

module.exports = {
  validateNewPost,
  checkCategory,
  checkPosts,
  checkUserAbleToEdit,
  updatePostValidation,
};