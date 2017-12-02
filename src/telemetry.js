/**
 * BattleRite docs: http://battlerite-docs.readthedocs.io/en/latest/telemetry/telemetry.html
 */

const util = require('util');
const _ = require('lodash');

let client = null;

module.exports.init = function (apiKey, apiBase) {
  client = require('./client');
  client.init(apiKey, apiBase);
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
    client.makeRequest('get', matchObject.telemetryUrl, null, true).then(function (data) {
      matchObject.telemetry = data;
      resolve(matchObject);
    });
  });
};