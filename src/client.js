let request = require('request-promise-native');

const config = require('../config');
const util = require('util');

module.exports.makeRequest = function (method, endpoint, data, isTelemetry) {
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