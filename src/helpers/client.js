let request = require('request-promise-native');
let _ = require('lodash');

const config = require('../../config');
const util = require('util');

function makeRequest (method, endpoint, data, isTelemetry) {
  const base = isTelemetry ? '' : util.format('%s/', config.base);

  let uri = util.format('%s%s', base, endpoint);

  let options = {
    method: method.toUpperCase(),
    uri: uri,
    json: true,
    gzip: true
  };

  if (!isTelemetry) {
    options = Object.assign(options,
      {
        headers: {
          authorization: config.apikey
        }
      });
  }

  return request(options);
};

module.exports.mapTelemetryAssetToObject = function (dataBlock, includedArray) {
  let telemetryObject = _.filter(includedArray, {
    'type': 'asset',
    'id': dataBlock.relationships.assets.data[0].id,
    'attributes': {
      'name': 'telemetry'
    }
  });

  dataBlock.telemetryUrl = telemetryObject[0].attributes.URL;
}

/**
 * Telemetry data is basically a snapshot of every event that happened within
 * a match.  Thisis the further details aspect of the match calls.
 */
module.exports.getTelementryData = function (matchObject) {
  return new Promise(function (resolve, reject) {
    makeRequest('get', matchObject.telemetryUrl, null, true).then(function (data) {
      matchObject.telemetry = data;
      resolve(matchObject);
    });
  });
};

/**
 * Get basic match information of the last 3 hours (default).
 * To get futher information about matches, call the getMatchesDetailed method.
 */
module.exports.getMatchesBasic = function (searchCriteria) {
  // @TODO: Implement search filtering stuff
  return makeRequest('get', 'matches');
};

/**
 * Get basic information about a specific match.
 * To get further information about the match, call the getMatchDetailed method.
 */
module.exports.getMatchBasic = function (matchId) {
  return makeRequest('get', util.format('matches/%s', matchId));
};

/**
 * This obviously has a higher overhead since we have to make 2 API calls
 * per match.  So if you can reduce the results by filtering that will improve
 * performance.
 */
module.exports.getMatchesDetailed = function (searchCriteria) {
  // @TODO: Implement search filtering stuff
  
  let that = this;

  return new Promise(function (resolve, reject) {
    return makeRequest('get', 'matches').then(function (matchesData) {
      matchesData.data = _.forEach(matchesData.data, function (dataBlock) {
        that.mapTelemetryAssetToObject(dataBlock, matchesData.included);
      });

      Promise.all(matchesData.data.map(that.getTelementryData)).then(function (resolver) {
        // Do some clean up here
        matchesData.data = _.forEach(resolver, function (dataBlockRevised) {
          // We don't need to delete this, but for now we will
          delete dataBlockRevised.telemetryUrl;
        });

        resolve(matchesData);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

module.exports.getMatchDetailed = function (matchId) {
  let that = this;

  return new Promise(function (resolve, reject) {
    return makeRequest('get', util.format('matches/%s', matchId)).then(function (matchData) {
      that.mapTelemetryAssetToObject(matchData.data, matchData.included);

      that.getTelementryData(matchData.data).then(function (resolver) {
        matchData.data = resolver;

        delete matchData.data.telemetryUrl;

        resolve(matchData);
      }).catch(function (err) {
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
};