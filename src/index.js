let apiKey = '';
let apiBase = '';
let matches = require('./matches');
let players = require('./players');
let status = require('./status');

module.exports.init = function (brApiKey, brApiBase) {
  apiKey = brApiKey;
  apiBase = brApiBase;

  // Available routes
  matches.init(brApiKey, brApiBase);
  status.init(brApiKey, brApiBase);

  // Current WIP routes (either due to me or BattleRite API devs)
  players.init(brApiKey, brApiBase);

  this.matches = matches;
  this.status = status;
}

/**
 * Supported exposed SDK methods
 */
module.exports.matches = matches;
module.exports.status = status;