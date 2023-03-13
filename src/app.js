const express = require('express');
const login = require('./controllers/login.controller');
const { createUser, getUsers, getByUserId, deleteUser } = require('./controllers/user.controller');
const { createCategory, getCategories } = require('./controllers/category.controller');
const { createPost, getPosts, getQueryPost, getNewPost, updatePost,
   deletePost } = require('./controllers/post.controller');
const validateToken = require('./middlewares/validateToken');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);
app.post('/user', createUser);
app.get('/user', validateToken, getUsers);
app.get('/user/:id', validateToken, getByUserId);
app.get('/user/me', validateToken, deleteUser);
app.post('/categories', validateToken, createCategory);
app.get('/categories', validateToken, getCategories);
app.post('/post', validateToken, createPost);
app.get('/post', validateToken, getPosts);
app.get('/post/:id', validateToken, getNewPost);
app.put('/post/:id', validateToken, updatePost);
app.delete('/post/:id', validateToken, deletePost);
app.get('/post/search', validateToken, getQueryPost);
module.exports = app;
