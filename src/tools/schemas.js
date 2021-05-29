const Joi = require('joi');

const toolSchema = Joi.object({
  title: Joi.string().trim(true).required(),
  link: Joi.string().uri().required(),
  description: Joi.string().trim(true),
  tags: Joi.array().items(
    Joi.string().trim(true),
  ),
});

module.exports = { toolSchema };
