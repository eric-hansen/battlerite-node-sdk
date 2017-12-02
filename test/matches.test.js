let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let matches = require('../src/matches');

const utils = require('../src/utils');

describe('matches:', function () {

  beforeEach(function () {
    matches.init(process.env.BR_API_KEY);
  });

  describe('parseSearchCriteria', function () {

    it('should return a URI-friendly string with single-ement arrays', function (done) {

      let result = matches.parseSearchCriteria({
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

      let result = matches.parseSearchCriteria({
        "page": {
          "offset": 0,
          "limit": 5
        },
        "sort": "createdAt",
        "filter": {
          "createdAt-start": "Now-28days",
          "createdAt-end": "Now",
          "playerIds": [1,2,3],
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

  describe('getMatchesBasic:', function () {
    beforeEach(function () {
      this.timeout(10000);

      utils.sleep(5);
    });

    it('should return match data', function () {

      return matches.getMatchesBasic().then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data.length).to.be.at.least(1);
        expect(result.data[0]).to.have.property('type');
        expect(result.data[0].type).to.equal('match');
      });
    });
  });

  describe('getMatchBasic:', function () {
    beforeEach(function () {
      this.timeout(10000);

      utils.sleep(5);
    });

    it ('given valid match should return match data', function () {
      return matches.getMatchBasic('AB9C81FABFD748C8A7EC545AA6AF97CC').then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data).to.have.property('type');
        expect(result.data.type).to.equal('match');
      });
    });
  });

  describe('getMatchDetailed:', function () {
    beforeEach(function () {
      this.timeout(10000);

      utils.sleep(5);
    });

    it('given valid match should return match data', function () {
      return matches.getMatchDetailed('AB9C81FABFD748C8A7EC545AA6AF97CC').then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data).to.have.property('type');
        expect(result.data.type).to.equal('match');
        expect(result.data).to.have.property('telemetry');
        expect(result.data.telemetry.length).to.be.at.least(1);
      });
    });

    it('given invalid match should return error', function () {
      return matches.getMatchDetailed('_').catch(function (result) {
        should.exist(result);
        expect(result).to.have.property('error');
        expect(result.error).to.have.property('errors');
        expect(result.error.errors.length).to.be.at.least(1);
        expect(result.error.errors[0]).to.have.property('title');
        expect(result.error.errors[0].title).to.equal('Not Found');
      });
    });

    it('given invalid API key should return error', function () {
      matches.init('');

      return matches.getMatchDetailed('AB9C81FABFD748C8A7EC545AA6AF97CC').catch(function (result) {
        should.exist(result);
        expect(result).to.have.property('error');
        expect(result.error).to.have.property('errors');
        expect(result.error.errors.length).to.be.at.least(1);
        expect(result.error.errors[0]).to.have.property('title');
        expect(result.error.errors[0].title).to.equal('Unauthorized');
      });
    });
  });

  describe('getMatchesDetailed:', function () {
    beforeEach(function () {
      this.timeout(10000);

      utils.sleep(5);
    });

    it('given valid match should return match data', function () {
      return matches.getMatchesDetailed().then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data.length).to.be.at.least(1);
        expect(result.data[0]).to.have.property('type');
        expect(result.data[0].type).to.equal('match');
        expect(result.data[0]).to.have.property('telemetry');
        expect(result.data[0].telemetry.length).to.be.at.least(1);
      });
    });
  });
});