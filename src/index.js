let apiKey = '';
let apiBase = '';
let matches = require('./matches');
let players = require('./players');

module.exports.init = function (brApiKey, brApiBase) {
  apiKey = brApiKey;
  apiBase = brApiBase;

  matches.init(brApiKey, brApiBase);
  players.init(brApiKey, brApiBase);

  this.matches = matches;
}

/**
 * Supported exposed SDK methods
 */
module.exports.matches = matches;