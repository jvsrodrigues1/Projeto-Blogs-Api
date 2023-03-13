const { postService } = require('../services/postService');
const errorMap = require('../utilities/mapError');

const createNewPost = async (req, res) => {
  const { body } = req;
  const userId = req.user.id;

  const { type, message } = await postService.createNewPost({ ...body, userId });
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createNewPost,
};