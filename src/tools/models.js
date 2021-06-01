const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const schemas = require('./schemas');

/** Represents a Tool on mongodb database */
const Tool = mongoose.model('Tool', mongoose.Schema(
  joigoose.convert(schemas.toolSchema),
));

module.exports = { Tool };
