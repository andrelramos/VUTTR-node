const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const schemas = require('./schemas');

/**
 * Model representing an user. The model schema is defined by userSchema
 * @see {@link userSchema}
*/
const User = mongoose.model('User', mongoose.Schema(
  joigoose.convert(schemas.userSchema),
));

module.exports = { User };
