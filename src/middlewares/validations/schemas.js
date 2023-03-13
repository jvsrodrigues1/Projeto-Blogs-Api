const Joi = require('joi');

const ERROR_MESSAGE = 'Some required fields are missing';

const addUser = Joi.object().keys({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
    'string.required': '"displayName" is required',
  }),
  email: Joi.string().email().required().messages({
    'string.min': '"email" must be a valid email',
    'string.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
    'string.required': '"password" is required',
  }),
});

const addCategory = Joi.object().keys({
  name: Joi.string().min(1).required().messages({
    'string.required': '"name" is required',
  }),
});

const newPostSchemas = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
});

const addPostSchemas = Joi.object().keys({
  title: Joi.string().min(1).required().messages({
    'string.empty': ERROR_MESSAGE,
    'string.base': ERROR_MESSAGE,
    'any.required': ERROR_MESSAGE,
  }),
  content: Joi.string().min(1).required().messages({
    'string.empty': ERROR_MESSAGE,
    'string.base': ERROR_MESSAGE,
    'any.required': ERROR_MESSAGE,
  }),
  categoryIds: Joi.array().required().messages({
    'any.required': 'one or more "categoryIds" not found',
  }),
});

const validateLogin = Joi.object({
  email: Joi.string().min(5).required()
.label('email'),
  password: Joi.string().min(1).required()
.label('password'),
});

const valitadeNewUser = Joi.object({
  displayName: Joi.string().min(8).required()
.label('displayName'),
  email: Joi.string().email().required()
.label('email'),
  password: Joi.string().min(6).required()
.label('password'),
  image: Joi.string().optional()
.label('image'),
});

const valitadeNewPost = Joi.object({
  title: Joi.string().required()
.label('title'),
  content: Joi.string().required()
.label('content'),
  categoryIds: Joi.array().required()
.label('categoryIds'),
});

const validateUpdatePost = Joi.object({
  title: Joi.string().required()
.label('title'),
  content: Joi.string().required()
.label('content'),
});

const ValidateCategory = Joi.object({
  name: Joi.string().min(1).required().label('name'),
});

module.exports = {
  newPostSchemas,
  addUser,
  addCategory,
  addPostSchemas,
  ValidateCategory,
  validateLogin,
  valitadeNewUser,
  valitadeNewPost,
  validateUpdatePost,
};