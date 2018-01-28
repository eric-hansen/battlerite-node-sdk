let request = require('request-promise-native');
let apiBase = '';
let apiKey = '';

const util = require('util');

module.exports.getApiBase = function () {
  return apiBase;
};

module.exports.init = function (key, base) {
  apiKey = key;
  apiBase = base || 'https://api.dc01.gamelockerapp.com/shards/global';
};

module.exports.makeRequest = function (method, endpoint, data, isTelemetry) {
  const base = isTelemetry ? '' : util.format('%s/', apiBase);
  
  let uri = util.format('%s%s', base, endpoint);

  if (endpoint === 'status') {
    uri = uri.replace('shards/global/', '');
  }

  let options = {
    method: method.toUpperCase(),
    uri: uri,
    json: true,
    gzip: true
  };

  options = isTelemetry ? options : Object.assign(options, {
    headers: {
      authorization: util.format("Bearer %s", apiKey)
    }
  });

  return new Promise(function (resolve, reject) {
    request(options).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      reject(error.error);
    });
  });
};