const controllers = require('./controllers');

module.exports.getAccessToken = async (token, cbFunc) => {
  const user = await controllers.getUserFromAccessToken(token.accessToken);
  const accessToken = {
    user: {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
    },
    expires: null,
  };

  cbFunc(user === undefined, user === undefined ? null : accessToken);
};

module.exports.saveAccessToken = async (accessToken, clientID, expires, user, cbFunc) => {
  try {
    await controllers.saveAccessToken(accessToken, user.id);
    cbFunc(false);
  } catch {
    cbFunc(true);
  }
};

module.exports.getClient = (clientID, clientSecret, cbFunc) => {
  const client = {
    clientID,
    clientSecret,
    grants: null,
    redirectUris: null,
  };

  cbFunc(false, client);
};

module.exports.grantTypeAllowed = (clientID, grantType, cbFunc) => {
  cbFunc(false, true);
};

module.exports.getUser = async (username, password, cbFunc) => {
  const user = await controllers.getUserFromCredentials(username, password);
  cbFunc(false, user === undefined ? null : user);
};
