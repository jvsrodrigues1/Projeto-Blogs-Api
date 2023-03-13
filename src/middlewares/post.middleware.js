const { newPostSchemas } = require('./validations/schemas');

const validateNewPost = async (req, res, next) => {
  try {
    const { body } = req;
    await newPostSchemas.validateAsync(body);
    next();
  } catch (err) {
    if (err.isJoi === true) {
      return res.status(400).send({
        message: 'Some required fields are missing',
      });
    }
  }
};

module.exports = {
  validateNewPost,
};