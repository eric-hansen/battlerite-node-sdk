/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/latest/status/status.html
 */

let client = null;

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
};

module.exports.getStatus = function () {
  return client.makeRequest('get', 'status');
};