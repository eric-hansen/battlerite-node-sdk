let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let client = require('../src/client');

/**
 * As of right now this end point is not available for use.
 */
describe('client:', function () {

  describe('init:', function () {

    beforeEach(function () {
      client = require('../src/client');
    });

    it('should add /shards/global to URL when includeShard parameter undefined', function (done) {

      client.init('', '');

      expect(client.getApiBase()).to.equal('https://api.dc01.gamelockerapp.com/shards/global');

      done();
    });
  });
});