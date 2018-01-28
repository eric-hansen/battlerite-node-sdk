let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let utils = require('../src/utils');

/**
 * As of right now this end point is not available for use.
 */
describe('utils:', function () {

  describe('isObject', function () {

    it('should return false for number', function (done) {

      let result = utils.isObject(1);

      should.exist(result);
      expect(result).to.equal(false);

      done();
    });

    it('should return false for array', function (done) {

      let result = utils.isObject([]);

      should.exist(result);
      expect(result).to.equal(false);

      done();
    });

    it('should return false for boolean', function (done) {

      let result = utils.isObject(true);

      should.exist(result);
      expect(result).to.equal(false);

      done();
    });

    it('should return true for object hashmap', function (done) {

      let result = utils.isObject({});

      should.exist(result);
      expect(result).to.equal(true);

      done();
    });
  });

  describe('flattenObject', function () {

    it('should return a property with a flattened array', function (done) {

      let result = utils.flattenObject({ 'array': ['hi', 'george', 1] });

      should.exist(result);
      expect(result).to.have.property('array');
      expect(result['array']).to.equal('hi,george,1');

      done();
    });

    it('should return same value when object not passed in', function (done) {

      let result = utils.flattenObject('string');

      should.exist(result);
      expect(result).to.equal('string');

      done();
    });

  it('should return a property with a scalar array', function (done) {

    let result = utils.flattenObject({ 'scalar': 1 });

    should.exist(result);
    expect(result).to.have.property('scalar');
    expect(result['scalar']).to.equal(1);

    done();
    });

    it('should return a property with a flattened object having a scalar value', function (done) {

      let result = utils.flattenObject({ 'object': {'key': 'value'} });

      should.exist(result);
      expect(result).to.have.property('object[key]');
      expect(result['object[key]']).to.equal('value');
      expect(result).to.not.have.property('object');

      done();
    });

    it('should return a property with a flattened object having an array value', function (done) {

      let result = utils.flattenObject({ 'object': { 'key': ['hi', 'george', 1] } });

      should.exist(result);
      expect(result).to.have.property('object[key]');
      expect(result['object[key]']).to.equal('hi,george,1');
      expect(result).to.not.have.property('object');

      done();
    });

    it('should return a property with a flattened object having scalar & array values', function (done) {

      let result = utils.flattenObject({ 'object': { 'key': ['hi', 'george', 1], 'scalar': 'value' } });

      should.exist(result);
      expect(result).to.have.property('object[key]');
      expect(result['object[key]']).to.equal('hi,george,1');
      expect(result).to.not.have.property('object');
      expect(result).to.have.property('object[scalar]');
      expect(result['object[scalar]']).to.equal('value');

      done();
    });

    it('should return an object flattened for searching', function (done) {

      let result = utils.flattenObject({
        "page": {
          "offset": 0,
          "limit": 5
        },
        "sort": "createdAt",
        "filter": {
          "createdAt-start": "Now-28days",
          "createdAt-end": "Now",
          "playerIds": [1],
          "teamNames": ['HI'],
          "gameMode": ['ranked']
        }
      });

      should.exist(result);
      expect(result).to.have.property('sort');
      expect(result.sort).to.equal('createdAt');
      expect(result).to.have.property('page[offset]');
      expect(result['page[offset]']).to.equal(0);
      expect(result).to.have.property('page[limit]');
      expect(result['page[limit]']).to.equal(5);
      expect(result).to.not.have.property('page');
      expect(result).to.have.property('filter[createdAt-start]');
      expect(result['filter[createdAt-start]']).to.equal('Now-28days');
      expect(result).to.have.property('filter[createdAt-end]');
      expect(result['filter[createdAt-end]']).to.equal('Now');
      expect(result).to.have.property('filter[playerIds]');
      expect(result['filter[playerIds]']).to.equal('1');
      expect(result).to.have.property('filter[teamNames]');
      expect(result['filter[teamNames]']).to.equal('HI');
      expect(result).to.have.property('filter[gameMode]');
      expect(result['filter[gameMode]']).to.equal('ranked');
      expect(result).to.not.have.property('filter');

      done();
    });

    it('should return an object flattened for searching with multiple elements in arrays', function (done) {

      let result = utils.flattenObject({
        "page": {
          "offset": 0,
          "limit": 5
        },
        "sort": "createdAt",
        "filter": {
          "createdAt-start": "Now-28days",
          "createdAt-end": "Now",
          "playerIds": [1,2,3],
          "teamNames": ['HI','george',12313],
          "gameMode": ['ranked','casual']
        }
      });

      should.exist(result);
      expect(result).to.have.property('sort');
      expect(result.sort).to.equal('createdAt');
      expect(result).to.have.property('page[offset]');
      expect(result['page[offset]']).to.equal(0);
      expect(result).to.have.property('page[limit]');
      expect(result['page[limit]']).to.equal(5);
      expect(result).to.not.have.property('page');
      expect(result).to.have.property('filter[createdAt-start]');
      expect(result['filter[createdAt-start]']).to.equal('Now-28days');
      expect(result).to.have.property('filter[createdAt-end]');
      expect(result['filter[createdAt-end]']).to.equal('Now');
      expect(result).to.have.property('filter[playerIds]');
      expect(result['filter[playerIds]']).to.equal('1,2,3');
      expect(result).to.have.property('filter[teamNames]');
      expect(result['filter[teamNames]']).to.equal('HI,george,12313');
      expect(result).to.have.property('filter[gameMode]');
      expect(result['filter[gameMode]']).to.equal('ranked,casual');
      expect(result).to.not.have.property('filter');

      done();
    });
});

  describe('flattenArray:', function () {

    it('should return same value when not an array', function (done) {

      let result = utils.flattenArray('hi');

      should.exist(result);
      expect(result).to.equal('hi');

      done();
    });

    it('should return same value when no delim passed in', function (done) {

      let result = utils.flattenArray(['hi']);

      should.exist(result);
      expect(result).to.be.an('array');
      expect(result.length).to.be.greaterThan(0);
      expect(result[0]).to.equal('hi');
      
      done();
    });

    it('should return same value when not an array but delim passed in', function (done) {

      let result = utils.flattenArray('hi', ',');

      should.exist(result);
      expect(result).to.equal('hi');

      done();
    });

    it('should return string when an array of 1 element', function (done) {

      let result = utils.flattenArray(['hi'], ',');

      should.exist(result);
      expect(result).to.equal('hi');

      done();
    });

    it('should return string when an array of 2 elements', function (done) {

      let result = utils.flattenArray(['hi', 'george'], ',');

      should.exist(result);
      expect(result).to.equal('hi,george');

      done();
    });
  });

  describe('parseSearchCriteria', function () {

    it('should return a URI-friendly string with single-ement arrays', function (done) {

      let result = utils.parseSearchCriteria({
        "page": {
          "offset": 0,
          "limit": 5
        },
        "sort": "createdAt",
        "filter": {
          "createdAt-start": "Now-28days",
          "createdAt-end": "Now",
          "playerIds": [1],
          "teamNames": ['HI'],
          "gameMode": ['ranked']
        }
      });

      should.exist(result);
      expect(result).to.have.string('page[offset]=0');
      expect(result).to.have.string('page[limit]=5');
      expect(result).to.have.string('sort=createdAt');
      expect(result).to.have.string('filter[createdAt-start]=Now-28days');
      expect(result).to.have.string('filter[createdAt-end]=Now');
      expect(result).to.have.string('filter[playerIds]=1');
      expect(result).to.have.string('filter[teamNames]=HI');
      expect(result).to.have.string('filter[gameMode]=ranked');

      done();
    });

    it('should return a URI-friendly string with multi-ement arrays', function (done) {

      let result = utils.parseSearchCriteria({
        "page": {
          "offset": 0,
          "limit": 5
        },
        "sort": "createdAt",
        "filter": {
          "createdAt-start": "Now-28days",
          "createdAt-end": "Now",
          "playerIds": [1, 2, 3],
          "teamNames": ['HI', 'george', 123141],
          "gameMode": ['ranked', 'casual']
        }
      });

      should.exist(result);
      expect(result).to.have.string('page[offset]=0');
      expect(result).to.have.string('page[limit]=5');
      expect(result).to.have.string('sort=createdAt');
      expect(result).to.have.string('filter[createdAt-start]=Now-28days');
      expect(result).to.have.string('filter[createdAt-end]=Now');
      expect(result).to.have.string('filter[playerIds]=1,2,3');
      expect(result).to.have.string('filter[teamNames]=HI,george,123141');
      expect(result).to.have.string('filter[gameMode]=ranked,casual');

      done();
    });
  });
});