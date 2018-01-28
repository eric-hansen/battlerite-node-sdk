/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/master/teams/teams.html
 * 
 * @NOTE:
 * - 2018-01-28 : While the endpoint is live and ready, I am not sure what correct values to pass in to this.
 * I have tried what they provided in the docs but that does not seem to work.  I am considering this a WIP.
 */

let client = null;
let utils = require('./utils');

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
};

module.exports.getTeams = function (searchCriteria) {
  return client.makeRequest('get', utils.setSearchCriteriaForEndpoint('teams', searchCriteria));
};