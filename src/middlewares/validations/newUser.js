const { User } = require('../../models');

const { addUser } = require('./schemas');

const isNewUserValid = async (displayName, email, password) => {
  const { error } = addUser.validate({ displayName, email, password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return { type: 'USER_EXISTS', message: 'User already registered' };
  
  return { type: null, message: '' };
};
module.exports = {
  isNewUserValid
,
};