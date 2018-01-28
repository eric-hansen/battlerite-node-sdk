/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/latest/matches/matches.html
 */

const util = require('util');
const _ = require('lodash');
const helpers = require('./utils');

let client = null;
let telemetry = null;

function cleanupMatchDataBlock(block) {
  // There's no harm in keeping this here (it's accessible regardless) but do it for now

  /* istanbul ignore else */
  if (block.hasOwnProperty('telemetryUrl')) {
    delete block.telemetryUrl;
  }
}

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
  telemetry = require('./telemetry');
  telemetry.init(apiKey, apiBase);
};

/**
 * Get basic match information of the last 3 hours (default).
 * To get futher information about matches, call the getMatchesDetailed method.
 */
module.exports.getMatchesBasic = function (searchCriteria) {
  // @TODO: Implement search filtering stuff
  return client.makeRequest('get', 'matches');
};

/**
 * Get basic information about a specific match.
 * To get further information about the match, call the getMatchDetailed method.
 */
module.exports.getMatchBasic = function (matchId) {
  return client.makeRequest('get', util.format('matches/%s', matchId));
};

/**
 * This obviously has a higher overhead since we have to make 2 API calls
 * per match.  So if you can reduce the results by filtering that will improve
 * performance.
 */
module.exports.getMatchesDetailed = function (searchCriteria) {
  // @TODO: Implement search filtering stuff

  /**
   * The damage here is that we need to get the matches first, and then
   * we need to get supporting data for each match separately.
   * 
   * So, the flow here is to get the matches data, and then get the telemetry URL
   * for each match, and store it in that match's data block.
   * 
   * We then make the call to fetch the JSON data for each telemetry URL and
   * store it in it's appropriate data block.
   */
  return new Promise(function (resolve, reject) {
    return client.makeRequest('get', 'matches').then(function (matchesData) {
      matchesData.data = _.forEach(matchesData.data, function (dataBlock) {
        telemetry.mapTelemetryAssetToObject(dataBlock, matchesData.included);
      });

      Promise.all(matchesData.data.map(telemetry.getTelementryData)).then(function (resolver) {
        // Do some clean up here
        matchesData.data = _.forEach(resolver, function (dataBlockRevised) {
          // We don't need to delete this, but for now we will
          cleanupMatchDataBlock(dataBlockRevised);
        });

        resolve(matchesData);
      }).catch(function (err) {
        /**
         * Unless I mock the response here this isn't testable, and would also
         * be du to the API changing, not due to my code.
         */
        
        /* istanbul ignore next */
        reject(err);
      });
    }).catch(function (err) {
      // An error with Request is not exactly reproducable and should not be something I need to validate.

      /* istanbul ignore next */
      reject(err);
    });
  });
};

module.exports.getMatchDetailed = function (matchId) {

  return new Promise(function (resolve, reject) {
    return client.makeRequest('get', util.format('matches/%s', matchId)).then(function (matchData) {
      telemetry.mapTelemetryAssetToObject(matchData.data, matchData.included);

      telemetry.getTelementryData(matchData.data).then(function (resolver) {
        matchData.data = resolver;

        cleanupMatchDataBlock(matchData.data);

        resolve(matchData);
      }).catch(function (err) {
        // An error with Request is not exactly reproducable and should not be something I need to validate.

        /* istanbul ignore next */
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
};