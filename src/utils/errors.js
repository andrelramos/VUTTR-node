class InvalidSchema extends Error {
  constructor(schemaName, details) {
    super(`Invalid ${schemaName}`);

    this.name = this.constructor.name;
    this.details = details;
  }
}

module.exports = { InvalidSchema };
