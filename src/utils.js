const _ = require('lodash');
const util = require('util');

/**
 * Determines if the provided variable/element/etc... is of Object (hash map) or not.
 * 
 * @param {mixed} element 
 */
module.exports.isObject = function (element) {
  return element && element.constructor === Object.prototype.constructor;
};

/**
 * If given following structure:
 * 
 * {
 *    "filter": {
 *      "createdAt-start": "Now-28days",
 *      "playerIds": [1,2,3]
 *    }
 * }
 * 
 * Expect result:
 * 
 * {
 *    "filter[createdAt-start]": "now-28days",
 *    "playerIds[]": "1,2,3"
 * }
 */
module.exports.flattenObject = function (object, parentKey) {
  if (!module.exports.isObject(object)) {
    return object;
  }

  let objKeys = _.keys(object);
  let result = {};

  _.forEach(objKeys, function (key) {
    let value = object[key];

    let prototype = value.hasOwnProperty;

    if (value && module.exports.isObject(value)) {
      let flattenedObject = module.exports.flattenObject(value, key);
      let flattenedKeys = _.keys(flattenedObject);

      _.forEach(flattenedKeys, function (newKey) {
        result[newKey] = flattenedObject[newKey];
      });
    } else {
      // If not array it returns the value as-is, so biggie
      value = module.exports.flattenArray(value, ',');

      if (parentKey !== undefined) {
        key = util.format('%s[%s]', parentKey, key);
      }

      result[key] = value;
    }
  });

  return result;
};

/**
 * Given array and delim, convert values within array to a string separated by delim.
 * 
 * @param array array 
 * @param string delim 
 */
module.exports.flattenArray = function (array, delim) {
  if (!(array instanceof Array) || delim === undefined) {
    return array;
  }

  return _.join(array, delim);
};

/**
 * @link https://stackoverflow.com/a/37575602
 * 
 * Given the rate limit of the BR API we need some sort of delay mechanism.
 * 
 * @param {integer} inSeconds 
 */
module.exports.sleep = function (inSeconds) {
  let delay = new Date(new Date().getTime() + inSeconds * 1000);
  while (delay > new Date()) { }
};