let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let entrypoint = require('../src/index');
var assert = require('chai').assert;

describe('index:', function () {

  it('should provide matches object', function (done) {
    
    should.exist(entrypoint);
    expect(entrypoint).to.have.property('matches');

    assert.isFunction(entrypoint.matches.getMatchesBasic);
    assert.isFunction(entrypoint.matches.getMatchesDetailed);
    assert.isFunction(entrypoint.matches.getMatchBasic);
    assert.isFunction(entrypoint.matches.getMatchDetailed);

    done();
  });

  describe('properties can make calls', function () {
    before(function () {
      entrypoint.init(process.env.BR_API_KEY);
    });

    it.only('should return data from matches object', function () {

      return entrypoint.matches.getMatchesBasic().then(function (matchData) {
        should.exist(matchData);
        expect(matchData).to.have.property('data');
      });
    });
  });  
});