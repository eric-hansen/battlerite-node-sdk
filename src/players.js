/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/latest/players/players.html
 */

let client = null;

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
};

module.exports.getPlayers = function () {
  return client.makeRequest('get', 'players');
};