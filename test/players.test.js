let should = require('chai').should();
let expect = require('chai').expect;
let describe = require('mocha').describe;
let it = require('mocha').it;
let players = require('../src/players');

describe('players:', function () {

  before(function () {
    players.init(process.env.BR_API_KEY);
  });

  describe('getPlayer:', function () {

    it('should return an error with no player id', function () {
      return players.getPlayer().catch(function (result) {
        should.exist(result);
        expect(result).to.have.property('errors');
        expect(result.errors.length).to.be.least(1);
        expect(result.errors[0]).to.have.property('title');
        expect(result.errors[0].title).to.equal('Internal Server Error');
      });
    });

    it('should return a player with player id', function () {
      return players.getPlayer(947461387339366400).then(function (result) {
        should.exist(result);
        expect(result).to.have.property('data');
        expect(result.data).to.have.property('type');
        expect(result.data.type).to.equal('player');
        expect(result.data).to.have.property('attributes');
        expect(result.data.attributes).to.have.property('name');
        expect(result.data.attributes.name).to.equal('official_kai');
      });
    });
  });

  describe('getPlayers:', function () {

    describe('without search criteria', function () {
      // I disagree with this per their docs, but...who am I to argue?
      it('should return an error', function () {
        return players.getPlayers().catch(function (result) {
          should.exist(result);
          expect(result).to.have.property('errors');
          expect(result.errors.length).to.be.least(1);
          expect(result.errors[0]).to.have.property('detail');
          expect(result.errors[0].detail).to.equal('No players found matching criteria');
          expect(result.errors[0]).to.have.property('title');
          expect(result.errors[0].title).to.equal('Not Found');
        });
      });
    });

    describe('with search criteria', function () {
      it('should return player data with player ID', function () {

        return players.getPlayers({ filter: { playerIds: [947461387339366400] } }).then(function (result) {
          should.exist(result);
          expect(result).to.have.property('data');
          expect(result.data.length).to.equal(1);
          expect(result.data[0]).to.have.property('type');
          expect(result.data[0].type).to.equal('player');
          expect(result.data[0]).to.have.property('attributes');
          expect(result.data[0].attributes).to.have.property('name');
          expect(result.data[0].attributes.name).to.equal('official_kai');
        });
      });

      it('should return player data with player name', function () {

        return players.getPlayers({ filter: { playerNames: ["official_kai"] } }).then(function (result) {
          should.exist(result);
          expect(result).to.have.property('data');
          expect(result.data.length).to.equal(1);
          expect(result.data[0]).to.have.property('type');
          expect(result.data[0].type).to.equal('player');
          expect(result.data[0]).to.have.property('attributes');
          expect(result.data[0].attributes).to.have.property('name');
          expect(result.data[0].attributes.name).to.equal('official_kai');
        });
      });

      it('should return player data with steam ID', function () {

        return players.getPlayers({ filter: { steamIds: ["76561198006350873"] } }).then(function (result) {
          should.exist(result);
          expect(result).to.have.property('data');
          expect(result.data.length).to.equal(1);
          expect(result.data[0]).to.have.property('type');
          expect(result.data[0].type).to.equal('player');
          expect(result.data[0]).to.have.property('attributes');
          expect(result.data[0].attributes).to.have.property('name');
          expect(result.data[0].attributes.name).to.equal('raevinfaith');
        });
      });
    });
  });
});