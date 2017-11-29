let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let client = require('../../src/helpers/client');

const config = require('../../config');

describe('helpers/client', function () {

  describe('getMatchesBasic', function () {

    it('should return match data', function () {

      return client.getMatchesBasic().then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data.length).to.be.at.least(1);
        expect(result.data[0]).to.have.property('type');
        expect(result.data[0].type).to.equal('match');
      });
    });
  });

  describe('getMatchBasic', function () {

    it ('given valid match should return match data', function () {
      return client.getMatchBasic('AB9C81FABFD748C8A7EC545AA6AF97CC').then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data).to.have.property('type');
        expect(result.data.type).to.equal('match');
      });
    });
  });

  describe('getMatchDetailed', function () {

    it('given valid match should return match data', function () {
      return client.getMatchDetailed('AB9C81FABFD748C8A7EC545AA6AF97CC').then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data).to.have.property('type');
        expect(result.data.type).to.equal('match');
        expect(result.data).to.have.property('telemetry');
        expect(result.data.telemetry.length).to.be.at.least(1);
      });
    });
  });

  describe('getMatchesDetailed', function () {

    it('given valid match should return match data', function () {
      return client.getMatchesDetailed().then(function (result) {
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