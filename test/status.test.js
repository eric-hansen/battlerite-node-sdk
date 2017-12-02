let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let status = require('../src/status');

const utils = require('../src/utils');

/**
 * As of right now this end point is not available for use.
 */
describe('status:', function () {

  before(function () {
    status.init(process.env.BR_API_KEY);
  });

  describe('getStatus:', function () {

    beforeEach(function () {
      this.timeout(10000);

      utils.sleep(5);
    });

    it('should return match data', function () {

      return status.getStatus().then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data).to.have.property('type');
        expect(result.data.type).to.equal('status');
        expect(result.data).to.have.property('id');
        expect(result.data.id).to.equal('gamelocker');
        expect(result.data).to.have.property('attributes');
        expect(result.data.attributes).to.have.property('releasedAt');
        expect(result.data.attributes).to.have.property('version');
      });
    });
  });
});