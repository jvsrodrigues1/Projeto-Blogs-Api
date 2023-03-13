const { PostService } = require('../services');
const { mapError } = require('../utilities/mapError');

const createPost = async (req, res) => {
  const newPost = req.body;
  const { email } = req.data;

  const { type, message } = await PostService.createPost(newPost, email);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const getPosts = async (_req, res) => {
  const { type, message } = await PostService.getPosts();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};
const getQueryPost = async (req, res, next) => {
  const { q } = req.query;
  try {
    const response = await PostService.getQueryPost(q);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const response = await PostService.updatePost({ 
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
    await PostService.deletePost({ 
      email: req.data,
      id: req.params.id });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getNewPost = async (req, res, next) => {
  try {
    const response = await PostService.getPost(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deletePost,
  createPost,
  getPosts,
  updatePost,
  getQueryPost,
  getNewPost,
};