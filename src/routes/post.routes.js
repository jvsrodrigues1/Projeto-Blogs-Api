const express = require('express');
const { createNewPost } = require('../controllers/post.controller');
const authToken = require('../middlewares/auth/ auth.middleware');
const { validateNewPost } = require('../middlewares/post.middleware');

const post = express.Router();

post.post(
  '/',
  authToken,
  validateNewPost,
  createNewPost,
);

module.exports = post;