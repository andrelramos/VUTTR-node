const Joi = require('joi');

/** Joi schema to define the user data */
const userSchema = Joi.object({
  username: Joi.string().trim(true).required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = { userSchema };
