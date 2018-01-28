# BattleRite Node SDK

Unofficial SDK for BattleRite API written in Node.

[![NPM](https://nodei.co/npm/battlerite-node-sdk.png)](https://npmjs.org/package/battlerite-node-sdk)

## Installation

Using npm:

`npm install --save battlerite-sdk` or `npm i --save battlerite-sdk`

## Requirements

To use this you need to register as a [BattleRite developer](https://developer.battlerite.com/) and obtain an API key.  The key is unique per application.  You then place that in the `config.json` file as `apikey`.

I had to use an API key to properly validate this, and the key is required if you wish to run the tests.

## How To Use

```javascript
const battleriteSdk = require('battlerite-sdk');
battleriteSdk.init('your API key here');

battlewriteSdk.matches.getMatchesBasic().then(function (data) {
  // some way to handle this data
});
```

The above is just one of the calles you'll have exposed.  Method names are a WIP as this just went under a restructure of how the module is loaded and handled.

The `ini` call of the module constant (`battleriteSdk`) has an optional 2nd param to put in a different API base URL.  However, only 1 is currently available so it defaults to that.

## Errors

Before the client.js call would just return the Promise from request.  This is no longer the case, as the `error` object is now returned, which will in turn provide a `errors` an array.  Basically, instead of just being a simple proxy, it returns a little bit less information.

## SDK Methods

To get an idea of how to use this in your own code, and an idea of what the various calls return, see `example.js`.

### Matches

* `getMatchesBasic` returns an overview of the last 5 matches within the past 3 hours
* `getMatchesDetailed` returns the same above data, but each match also has a `telemetry` element that provides insights to various actions within each match
* `getMatchBasic` same as `getMatchesBasic` but for a single match.  Required param is the match ID
* `getMatchDetailed` same as `getMatchesDetailed` but for a single match.  Required param is the match ID

**Notes**

`getMatchBasic` and `getMatchDetailed` do not allow any filtering outside of the use of match ID.

`getMatchesBasic` and `getMatchesDetailed` allow search filtering by passing in an object structured like so:

```json
{
  "page": {
    "offset": 0,
    "limit": 5
  },
  "sort": "createdAt",
  "filter": {
    "createdAt-start": "Now-28days",
    "createdAt-end": "Now",
    "playerIds": [],
    "teamNames": [],
    "gameMode": []
  }
}
```

The SDK will convert the above mapping to the proper structure.  Each of the above are the defaults as per API docs.

With that said, here are notes as needed:

* `page.offset` - Allows paging over results
* `page.limit` - Has a range of 1-5
* `sort` - Element within the `data[n]` block to sort results by
* `filter.createdAt-*` - Format is in ISO8601 if not using English-like syntax (i.e.: 2017-01-01T13:25:30Z)
* `filter.playerIds` - An array of player ID(s) to filter through
* `filter.teamNames` - If trying to get results fo any team(s), their name goes within the array
* `filter.gameMode` - Value(s) are of casual, ranked, etc...

### Players

* `getPlayers` returns an array of players.
* `getPlayer` returns a single player object

### Teams

* `getTeams` returns a list of events by team and/or season

## Contributions

If you have any suggestions on how to make this better just file an issue.

If you want to contribute to this code, fork this project and submit a pull request.

## FAQ

**I get an error after making x amount of calls in a minute, why?**

BattleRite's API is rate-limited to 50 requests/minute for development keys.  You can request an limit increase for a specific key through the portal.

**What is BattleRite?!**

It's an arena game of fun destruction.  Most seem to want to call it a MOBA, and then get flamed.  You can YouTube it or check out the [BattleRite website](http://www.battlerite.com).

**Why a SDK?**

Because these are fun and I thought it would be helpful contributing an SDK that does not potentially go against the ToS of the game.