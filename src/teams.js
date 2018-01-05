/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/master/teams/teams.html
 */

let client = null;

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
};

module.exports.getPlayers = function () {
  return client.makeRequest('get', 'teams');
};