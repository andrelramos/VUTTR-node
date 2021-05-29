const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const schemas = require('./schemas');

const Tool = mongoose.model('Tool', mongoose.Schema(
  joigoose.convert(schemas.toolSchema),
));

module.exports = { Tool };
