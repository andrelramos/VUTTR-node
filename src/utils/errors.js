const Joi = require('joi');

/**
 * Represents a valid schema for error details informed on InvalidSchema error
 * @see {@link InvalidSchema}
 */
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

/** Custom error for invalid Joi schemas */
class InvalidSchema extends Error {
  constructor(schemaName, details) {
    super(`Invalid ${schemaName}`);

    this.name = this.constructor.name;
    this.details = details;

    Joi.assert(this.details, invalidDetailsSchema);
  }
}

module.exports = { InvalidSchema, invalidDetailsSchema };
