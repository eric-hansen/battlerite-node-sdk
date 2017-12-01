let request = require('request-promise-native');
let apiBase = '';
let apiKey = '';

const util = require('util');

module.exports.init = function (key, base) {
  apiKey = key;
  apiBase = base || 'https://api.dc01.gamelockerapp.com/shards/global';
};

module.exports.makeRequest = function (method, endpoint, data, isTelemetry) {
  const base = isTelemetry ? '' : util.format('%s/', apiBase);

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
          authorization: apiKey
        }
      });
  }

  return request(options);
};