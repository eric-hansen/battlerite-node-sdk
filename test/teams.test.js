let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let teams = require('../src/teams');

describe('teams:', function () {

  before(function () {
    teams.init(process.env.BR_API_KEY);
  });

  describe('getTeams:', function () {
    it('should return an error with no search criteria', function () {
      return teams.getTeams().catch(function (result) {
        should.exist(result);
        expect(result).to.have.property('errors');
        expect(result.errors.length).to.be.least(1);
        expect(result.errors[0]).to.have.property('title');
        expect(result.errors[0].title).to.equal('Teams Not Found');
      });
    });

    it.skip('should return a teams object with player id', function () {
      return teams.getTeams({ tag: { playerIds: 934511096860184600 } }).then(function (result) {
        should.exist(result);
      });
    });
  });
});