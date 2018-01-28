let apiKey = '';
let apiBase = '';
let matches = require('./matches');
let players = require('./players');
let status = require('./status');
let teams = require('./teams');

module.exports.init = function (brApiKey, brApiBase) {
  apiKey = brApiKey;
  apiBase = brApiBase;

  // Available routes
  matches.init(brApiKey, brApiBase);
  status.init(brApiKey, brApiBase);
  players.init(brApiKey, brApiBase);

  // Current WIP routes (either due to me or BattleRite API devs)
  teams.init(brApiKey, brApiBase);

  this.matches = matches;
  this.status = status;
  this.players = players;
  this.teams = teams;
}

/**
 * Supported exposed SDK methods
 */
module.exports.matches = matches;
module.exports.status = status;
module.exports.players = players;
module.exports.teams = teams;