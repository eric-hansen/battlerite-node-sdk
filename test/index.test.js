let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let entrypoint = require('../src/index');
var assert = require('chai').assert;

describe('index:', function () {

  it('should provide matches object', function () {
    
    should.exist(entrypoint);
    expect(entrypoint).to.have.property('matches');
    assert.isFunction(entrypoint.matches.getMatchesBasic);
    assert.isFunction(entrypoint.matches.getMatchesDetailed);
    assert.isFunction(entrypoint.matches.getMatchBasic);
    assert.isFunction(entrypoint.matches.getMatchDetailed);
  });
});