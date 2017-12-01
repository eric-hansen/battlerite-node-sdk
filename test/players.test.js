let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let players = require('../src/players');

/**
 * As of right now this end point is not available for use.
 */
describe.skip('players:', function () {

  before(function () {
    players.init(process.env.BR_API_KEY);
  });

  describe('getPlayers:', function () {

    it('should return match data', function () {

      return players.getPlayers().then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data.length).to.be.at.least(1);
        expect(result.data[0]).to.have.property('type');
        expect(result.data[0].type).to.equal('match');
      });
    });
  });
});