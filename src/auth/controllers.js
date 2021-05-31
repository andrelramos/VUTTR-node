const bcrypt = require('bcrypt');
const models = require('./models');
const schemas = require('./schemas');
const errors = require('./errors');
const utilsErrors = require('../utils/errors');

/**
 * Generate a bcrypt hash from a passwrod
 * @param {string} password - The user password
 * @returns {string} bcrypt hash
 */
async function generateHash(password) {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
}

/**
 * Save a new user on database
 * @throws {InvalidSchema} Invalid userData schema
 * @throws {mongoose.Error.ValidationError} Invalid mongoose user schema
 * @throws {UserAlreadyRegistered} Username already registered on database
 * @param {string} userData.username - The new user username
 * @param {string} userData.password - The new user raw password
 * @returns {User} saved user
 * @see {@link User}
 * @see {@link UserAlreadyRegistered}
 */
async function saveUser(userData) {
  // Validate userData schema
  const validateResult = schemas.userSchema.validate(userData);

  if (validateResult.error !== undefined) {
    throw new utilsErrors.InvalidSchema('User', validateResult.error.details);
  }

  const user = new models.User(userData);

  user.password = await generateHash(user.password);
  await user.validate();

  const usernameAlreadyRegistered = await models.User.find({ username: user.username }).count();

  if (!usernameAlreadyRegistered) {
    return user.save();
  }

  throw new errors.UserAlreadyRegistered();
}

/**
 * Find one user using username and password
 * @param {string} username
 * @param {string} password
 * @returns {User}
 * @see {@link User}
 */
async function getUserFromCredentials(username, password) {
  const user = await models.User.findOne({ username }).lean();

  if (user) {
    // Compare bcrypt hash to validate the password
    const passwordIsValid = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (passwordIsValid) return user;
  }

  return null;
}

module.exports = {
  saveUser,
  getUserFromCredentials,
};
