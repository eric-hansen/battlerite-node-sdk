# BattleRite Node SDK

Unofficial SDK for BattleRite API written in Node.

## Installation

Using npm:

`npm install --save battlerite-sdk` or `npm i --save battlerite-sdk`

## Requirements

To use this you need to register as a [BattleRite developer](https://developer.battlerite.com/) and obtain an API key.  The key is unique per application.  You then place that in the `config.json` file as `apikey`.

I had to use an API key to properly validate this, and the key is required if you wish to run the tests.

## Available Data

Right now the BattleRite API only supports getting match data.  So all that the SDK allows is getting a group, or single, match.

However, there is the additional *Detailed calls that will return more information about each match, at the cost of more round trips (this requires 2 API calls).

The SDK requests compressed data to save on bandwidth, which may add some extra overhead.  I am considering making this an opt-out option via config.json in the future.

## Contributions

If you have any suggestions on how to make this better just file an issue.

If you want to contribute to this code, fork this project and submit a pull request.

## FAQ

**I get an error after making x amount of calls in a minute, why?**

BattleRite's API is rate-limited to 10 requests/minute for development keys.  You can request an limit increase for a specific key through the portal.

**What is BattleRite?!**

It's an arena game of fun destruction.  Most seem to want to call it a MOBA, and then get flamed.  You can YouTube it or check out the [BattleRite website](http://www.battlerite.com).

**Why a SDK?**

Because these are fun and I thought it would be helpful contributing an SDK that does not potentially go against the ToS of the game.