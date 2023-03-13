const { User, Category, BlogPost, PostCategory, getPost } = require('../models');
const { validateNewPost, checkPosts, updatePostValidation, 
  checkUserAbleToEdit } = require('../middlewares/validations/newPost');

const createPost = async (newPost, email) => {
  const { title, content, categoryIds } = newPost;
  const error = await validateNewPost(title, content, categoryIds);
  if (error.type) return error;

  const user = await User.findOne({ where: { email } });
  await BlogPost.create({ title, content, userId: user.dataValues.id });

  const createdPost = await BlogPost.findAll({ order: [['id', 'DESC']], limit: 1 });

  await Promise.all(categoryIds
    .map(async (categoryId) => PostCategory.create({
      postId: createdPost[0].dataValues.id, categoryId })));

  return { type: null, message: createdPost[0] };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: posts };
};

const getQueryPost = async (query) => {
  const posts = await getPosts();
  
  const filterPost = posts.filter(({ dataValues: { title, content } }) => content.toLowerCase()
  .includes(query.toLowerCase()) || title.toLowerCase().includes(query.toLowerCase()));

  return filterPost;
};

const updatePost = async ({ body, email, id }) => {
  const { title, content } = body;
  await checkPosts(id);
  await updatePostValidation(title, content);
  await checkUserAbleToEdit(email, id);
  await BlogPost.update(
    {
      title,
      content,
    },
    {
      where: { id },
    },
  );

  const updatedPost = await getPost(id);
  return updatedPost;
};

const deletePost = async ({ email, id }) => {
  await checkPosts(id);
  await checkUserAbleToEdit(email, id);
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  getQueryPost,
  updatePost,
};