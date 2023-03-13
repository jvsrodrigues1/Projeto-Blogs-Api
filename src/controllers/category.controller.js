const { CategoryService, postService } = require('../services');
const { mapError } = require('../utilities/mapError');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await CategoryService.createCategory({ name });

  if (type) return res.status(mapError(type)).json({ message });
    
  return res.status(201).json(message);
};

const getCategories = async (_req, res) => {
  const { type, message } = await CategoryService.getCategories();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const newPost = async (req, res, next) => {
  try {
    const response = await postService.newPost({ body: req.body, email: req.data });
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const response = await postService.getPost(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (_req, res, next) => {
  try {
    const response = await postService.getPosts();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getQueryPost = async (req, res, next) => {
  const { q } = req.query;
  try {
    const response = await postService.getQueryPost(q);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const response = await postService.updatePost({ 
      body: req.body,
      email: req.data,
      id: req.params.id });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await postService.deletePost({ 
      email: req.data,
      id: req.params.id });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getPost,
  getPosts,
  getQueryPost,
  newPost,
  updatePost,
  deletePost,
};
