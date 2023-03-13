const express = require('express');
const login = require('./controllers/login.controller');
const { createUser, getUsers, getByUserId } = require('./controllers/user.controller');
const { createCategory, getCategories } = require('./controllers/category.controller');
const { createPost, getPosts } = require('./controllers/post.controller');
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
app.post('/categories', validateToken, createCategory);
app.get('/categories', validateToken, getCategories);
app.post('/post', validateToken, createPost);
app.get('/post', validateToken, getPosts);

module.exports = app;
