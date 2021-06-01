const Joi = require('joi');

/** Represents a valide schema for tools */
const toolSchema = Joi.object({
  title: Joi.string().trim(true).required(),
  link: Joi.string().uri().required(),
  description: Joi.string().trim(true),
  tags: Joi.array().items(
    Joi.string().trim(true),
  ),
});

module.exports = { toolSchema };
