const mongoose = require('mongoose');

const OAuthTokens = mongoose.model('OAuthTokens', new mongoose.Schema({
  accessToken: { type: String },
  accessTokenExpiresOn: { type: Date },
  client: { type: Object },
  clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresOn: { type: Date },
  user: { type: Object },
  userId: { type: String },
}));

module.exports = { OAuthTokens };
