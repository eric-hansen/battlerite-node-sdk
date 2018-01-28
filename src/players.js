/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/latest/players/players.html
 */

let client = null;
let utils = require('./utils');
let util = require('util');

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
};

module.exports.getPlayers = function (searchCriteria) {
  let parsedSearchCriteria = utils.parseSearchCriteria(searchCriteria);

  return client.makeRequest('get', util.format("players?%s", parsedSearchCriteria));
};

module.exports.getPlayer = function (playerId) {
  return client.makeRequest('get', util.format("players/%s", playerId));
};