const OAuthServer = require('express-oauth-server');
const controllers = require('./controllers');

module.exports = new OAuthServer({
  model: controllers,
  grants: ['password'],
  debug: true,
});
