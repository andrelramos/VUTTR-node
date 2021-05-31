/** Error excepetion to duplicated username */
class UserAlreadyRegistered extends Error {
  constructor(username) {
    super(`User ${username} already registered`);
    this.name = this.constructor.name;
  }
}

module.exports = { UserAlreadyRegistered };
