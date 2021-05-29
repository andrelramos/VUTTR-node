const Joi = require('joi');

const invalidDetailsSchema = Joi.array().items(Joi.object({
  message: Joi.string(),
  path: Joi.array().items(
    Joi.string(),
  ),
  type: Joi.string(),
  context: Joi.object({
    label: Joi.string(),
    value: Joi.string(),
    key: Joi.string(),
  }),
}));

class InvalidSchema extends Error {
  constructor(schemaName, details) {
    super(`Invalid ${schemaName}`);

    this.name = this.constructor.name;
    this.details = details;

    Joi.assert(this.details, invalidDetailsSchema);
  }
}

module.exports = { InvalidSchema, invalidDetailsSchema };
