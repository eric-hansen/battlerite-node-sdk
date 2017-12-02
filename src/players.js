/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/latest/players/players.html
 */

let client = null;

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
};

module.exports.getPlayers = function () {
  // Below istanbul line should be removed once the players endpoint is available via API.

  /* istanbul ignore next */
  return client.makeRequest('get', 'players');
};