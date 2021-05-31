/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */

const userControllers = require('../controllers');
const models = require('./models');

/**
 * Get access token.
 */
module.exports.getAccessToken = (accessToken) => {
  return models.OAuthTokens.findOne({ accessToken }).lean();
};

/**
 * Get client.
 */
module.exports.getClient = (id, secret) => {
  return {
    id: id,
    secret: secret,
    redirectUris: ['/auth/login'],
    accessTokenLifetime: 60 * 60, // 1 hour
    refreshTokenLifetime: 60 * 10, // 10 minutes
    grants: [
      'authorization_code',
      'client_credentials',
      'implicit',
      'refresh_token',
      'password',
    ],
  };
};

/**
 * Get refresh token.
 */
module.exports.getRefreshToken = (refreshToken) => {
  return models.OAuthTokens.findOne({ refreshToken }).lean();
};

/**
 * Get user.
 */

module.exports.getUser = async (username, password) => {
  const user = await userControllers.getUserFromCredentials(username, password);
  if (user) return user;
  return null;
};

/**
 * Save token.
 */
module.exports.saveToken = (token, client, user) => {
  const accessToken = new models.OAuthTokens({
    accessToken: token.accessToken,
    accessTokenExpiresOn: token.accessTokenExpiresOn,
    client: client,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresOn: token.refreshTokenExpiresOn,
    user: user,
    // eslint-disable-next-line no-underscore-dangle
    userId: user._id,
  });

  return new Promise((resolve, reject) => {
    accessToken.save((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  }).then((result) => {
    const saveResult = result && typeof result === 'object' ? result.toJSON() : result;

    // Unsure what else points to `saveResult` in oauth2-server, making copy to be safe
    const data = {
      ...saveResult,
      client: saveResult.clientId,
      user: saveResult.userId,
    };

    return data;
  });
};
