/**
 * Please note that this file is not meant in any way to be a cookie-cutter template.
 * This is simply to show you how to use this SDK as well as what the data structure should
 * look like on successful calls.
 * 
 * The examples are copoy/pasted straight from the BattleRite API docs except for
 * the `telemetry` blocks.  Those are added in by the SDK itself.
 */

let battleriteSdk = require('battlerite-sdk');

battleriteSdk.init('API_KEY_HERE');

const filter = {
  'sort': 'duration',
  'filter': {
    'gameMode': ['ranked', 'battlegrounds']
  }
};

/**
 * Get mulitple recent matches with basic information.
 */
battleriteSdk.matches.getMatchesBasic().then(function (matches) {
  matches = {
    "data": [{
      "type": "match",
      "id": "D005654E95174996B303A17B979DC016",
      "attributes": {
        "createdAt": "2017-11-10T20:30:08Z",
        "duration": 492,
        "gameMode": "1733162751",
        "patchVersion": "1.0",
        "shardId": "global",
        "stats": {
          "mapID": "417DE573937D74E39BF40EB6CF82670B",
          "type": "QUICK2V2 ",
        },
        "titleId": "stunlock-studios-battlerite"
      },
      "relationships": {
        "assets" {
          "data": [
            {
              "type": "asset",
              "id": "1ad97f85-cf9b-11e7-b84e-0a586460f004"
            }
          ]
        },
        "rosters": {
          "data": [
            {
              "type": "roster",
              "id": "ea77c2eb-d44e-11e6-8f77-0242ac130004"
            },
            ...
          ]
        },
        "rounds": {
          "data": [
            {
              "type": "round",
              "id": "b7326b70-1473-48b4-a30b-3eb9bb319541"
            }
            ...
          ]
        },
        "spectators": {
          "data": []
        }
      }
      "links": {
        "schema": "schema": "https://raw.githubusercontent.com/madglory/gamelocker-stunlock-studios-battlerite/master/schemas/1.0/match_index.json",
        "self": "https://api.dc01.gamelockerapp.com/shards/global/matches/D005654E95174996B303A17B979DC016"
      }
    },
    ...  ],
    "included": [
      { ...}, //Player, Roster, Participant, asset, and Round structures
      ...
  ],
    "links": {
      ...
  },
    "meta": {}
  };
});

/**
 * Get multiple recent matches with basic information via filtering.
 */
battleriteSdk.matches.getMatchesBasic(filter).then(function (matches) {
  matches = {
    "data": [{
      "type": "match",
      "id": "D005654E95174996B303A17B979DC016",
      "attributes": {
        "createdAt": "2017-11-10T20:30:08Z",
        "duration": 492,
        "gameMode": "1733162751",
        "patchVersion": "1.0",
        "shardId": "global",
        "stats": {
          "mapID": "417DE573937D74E39BF40EB6CF82670B",
          "type": "QUICK2V2 ",
        },
        "titleId": "stunlock-studios-battlerite"
      },
      "relationships": {
        "assets" {
          "data": [
            {
              "type": "asset",
              "id": "1ad97f85-cf9b-11e7-b84e-0a586460f004"
            }
          ]
        },
        "rosters": {
          "data": [
            {
              "type": "roster",
              "id": "ea77c2eb-d44e-11e6-8f77-0242ac130004"
            },
            ...
          ]
        },
        "rounds": {
          "data": [
            {
              "type": "round",
              "id": "b7326b70-1473-48b4-a30b-3eb9bb319541"
            }
            ...
          ]
        },
        "spectators": {
          "data": []
        }
      }
      "links": {
        "schema": "schema": "https://raw.githubusercontent.com/madglory/gamelocker-stunlock-studios-battlerite/master/schemas/1.0/match_index.json",
        "self": "https://api.dc01.gamelockerapp.com/shards/global/matches/D005654E95174996B303A17B979DC016"
      }
    },
    ...  ],
    "included": [
      { ...}, //Player, Roster, Participant, asset, and Round structures
      ...
  ],
    "links": {
      ...
  },
    "meta": {}
  };
});

/**
 * Get mulitple recent matches with detailed information.
 */
battleriteSdk.matches.getMatchesDetailed().then(function (matches) {
  matches = {
    "data": [{
      "type": "match",
      "id": "D005654E95174996B303A17B979DC016",
      "attributes": {
        "createdAt": "2017-11-10T20:30:08Z",
        "duration": 492,
        "gameMode": "1733162751",
        "patchVersion": "1.0",
        "shardId": "global",
        "stats": {
          "mapID": "417DE573937D74E39BF40EB6CF82670B",
          "type": "QUICK2V2 ",
        },
        "titleId": "stunlock-studios-battlerite"
      },
      "relationships": {
        "assets" {
          "data": [
            {
              "type": "asset",
              "id": "1ad97f85-cf9b-11e7-b84e-0a586460f004"
            }
          ]
        },
        "rosters": {
          "data": [
            {
              "type": "roster",
              "id": "ea77c2eb-d44e-11e6-8f77-0242ac130004"
            },
            ...
          ]
        },
        "rounds": {
          "data": [
            {
              "type": "round",
              "id": "b7326b70-1473-48b4-a30b-3eb9bb319541"
            }
            ...
          ]
        },
        "spectators": {
          "data": []
        }
      }
      "links": {
        "schema": "schema": "https://raw.githubusercontent.com/madglory/gamelocker-stunlock-studios-battlerite/master/schemas/1.0/match_index.json",
        "self": "https://api.dc01.gamelockerapp.com/shards/global/matches/D005654E95174996B303A17B979DC016"
      },
      "telemetry": [
        {
          "cursor": 499303,
          "type": "com.stunlock.service.matchmaking.avro.QueueEvent",
          "dataObject": {
            "time": 1509652368501,
            "userId": "867669421479563264",
            "teamId": "926118591642865664",
            "sessionId": "79DED2DF8F365B2978A57071E9E9028C",
            "season": 6,
            "eventType": "MATCH",
            "timeJoinedQueue": "34506717429220767",
            "timeInQueue": 2.0009074,
            "character": 543520739,
            "characterArchetype": 8,
            "queueTypes": ["QUICK2V2"],
            "limitMatchmakingRange": false,
            "regionSamples": [
              {
                "region": "eu-west",
                "latencyMS": 32
              },
              {
                "region": "na-northeast",
                "latencyMS": 110
              }
            ],
            "preferredRegion": "eu-west",
            "rankingType": "UNRANKED",
            "league": 0,
            "division": 2,
            "divisionRating": 0,
            "teamSize": 1,
            "teamMembers": [],
            "placementGamesLeft": 6,
            "matchId": "7260797FD85648B295DF0AA16E17A80D",
            "matchRegion": "eu-west",
            "teamSide": 1,
            "autoMatchmaking": true
          }
        },
        ...]
    },
  ...  ],
    "included": [
      { ...}, //Player, Roster, Participant, asset, and Round structures
      ...
  ],
    "links": {
      ...
  },
    "meta": {}
  };
});

/**
 * Get multiple recent matches with detailed information via filtering.
 */
battleriteSdk.matches.getMatchesDetailed(filter).then(function (matches) {
  matches = {
    "data": [{
      "type": "match",
      "id": "D005654E95174996B303A17B979DC016",
      "attributes": {
        "createdAt": "2017-11-10T20:30:08Z",
        "duration": 492,
        "gameMode": "1733162751",
        "patchVersion": "1.0",
        "shardId": "global",
        "stats": {
          "mapID": "417DE573937D74E39BF40EB6CF82670B",
          "type": "QUICK2V2 ",
        },
        "titleId": "stunlock-studios-battlerite"
      },
      "relationships": {
        "assets" {
          "data": [
            {
              "type": "asset",
              "id": "1ad97f85-cf9b-11e7-b84e-0a586460f004"
            }
          ]
        },
        "rosters": {
          "data": [
            {
              "type": "roster",
              "id": "ea77c2eb-d44e-11e6-8f77-0242ac130004"
            },
            ...
          ]
        },
        "rounds": {
          "data": [
            {
              "type": "round",
              "id": "b7326b70-1473-48b4-a30b-3eb9bb319541"
            }
            ...
          ]
        },
        "spectators": {
          "data": []
        }
      }
      "links": {
        "schema": "schema": "https://raw.githubusercontent.com/madglory/gamelocker-stunlock-studios-battlerite/master/schemas/1.0/match_index.json",
        "self": "https://api.dc01.gamelockerapp.com/shards/global/matches/D005654E95174996B303A17B979DC016"
      },
      "telemetry": [
        {
          "cursor": 499303,
          "type": "com.stunlock.service.matchmaking.avro.QueueEvent",
          "dataObject": {
            "time": 1509652368501,
            "userId": "867669421479563264",
            "teamId": "926118591642865664",
            "sessionId": "79DED2DF8F365B2978A57071E9E9028C",
            "season": 6,
            "eventType": "MATCH",
            "timeJoinedQueue": "34506717429220767",
            "timeInQueue": 2.0009074,
            "character": 543520739,
            "characterArchetype": 8,
            "queueTypes": ["QUICK2V2"],
            "limitMatchmakingRange": false,
            "regionSamples": [
              {
                "region": "eu-west",
                "latencyMS": 32
              },
              {
                "region": "na-northeast",
                "latencyMS": 110
              }
            ],
            "preferredRegion": "eu-west",
            "rankingType": "UNRANKED",
            "league": 0,
            "division": 2,
            "divisionRating": 0,
            "teamSize": 1,
            "teamMembers": [],
            "placementGamesLeft": 6,
            "matchId": "7260797FD85648B295DF0AA16E17A80D",
            "matchRegion": "eu-west",
            "teamSide": 1,
            "autoMatchmaking": true
          }
        },
      ...]
    },
  ...  ],
    "included": [
      { ...}, //Player, Roster, Participant, asset, and Round structures
      ...
  ],
    "links": {
      ...
  },
    "meta": {}
  };
});

/**
 * Get single match with basic information
 */
battleriteSdk.matches.getMatchBasic('MATCH_ID_HERE').then(function (match) {
  match = {
    "data": {
      "type": "match",
      "id": "D005654E95174996B303A17B979DC016",
      "attributes": {
        "createdAt": "2017-11-10T20:30:08Z",
        "duration": 492,
        "gameMode": "1733162751",
        "patchVersion": "1.0",
        "shardId": "global",
        "stats": {
          "mapID": "417DE573937D74E39BF40EB6CF82670B",
          "type": "QUICK2V2 ",
        },
        "titleId": "stunlock-studios-battlerite"
      },
      "relationships": {
        "assets" {
          "data": [
            {
              "type": "asset",
              "id": "1ad97f85-cf9b-11e7-b84e-0a586460f004"
            }
          ]
        },
        "rosters": {
          "data": [
            {
              "type": "roster",
              "id": "ea77c2eb-d44e-11e6-8f77-0242ac130004"
            },
            ...
          ]
        },
        "rounds": {
          "data": [
            {
              "type": "round",
              "id": "b7326b70-1473-48b4-a30b-3eb9bb319541"
            }
            ...
          ]
        },
        "spectators": {
          "data": []
        }
      }
      "links": {
        "schema": "schema": "https://raw.githubusercontent.com/madglory/gamelocker-stunlock-studios-battlerite/master/schemas/1.0/match_index.json",
        "self": "https://api.dc01.gamelockerapp.com/shards/global/matches/D005654E95174996B303A17B979DC016"
      }
    },
    "included": [
      { ...}, //Player, Roster, Participant, asset, and Round structures
      ...
  ],
    "links": {
      ...
  },
    "meta": {}
  };
});

/**
 * Get single match with detailed information
 */
battleriteSdk.matches.getMatchDetailed('MATCH_ID_HERE').then(function (match) {
  match = {
    "data": {
        "type": "match",
        "id": "D005654E95174996B303A17B979DC016",
        "attributes": {
          "createdAt": "2017-11-10T20:30:08Z",
          "duration": 492,
          "gameMode": "1733162751",
          "patchVersion": "1.0",
          "shardId": "global",
          "stats": {
            "mapID": "417DE573937D74E39BF40EB6CF82670B",
            "type": "QUICK2V2 ",
          },
          "titleId": "stunlock-studios-battlerite"
        },
        "relationships": {
          "assets" {
            "data": [
              {
                "type": "asset",
                "id": "1ad97f85-cf9b-11e7-b84e-0a586460f004"
              }
            ]
          },
          "rosters": {
            "data": [
              {
                "type": "roster",
                "id": "ea77c2eb-d44e-11e6-8f77-0242ac130004"
              },
              ...
          ]
          },
          "rounds": {
            "data": [
              {
                "type": "round",
                "id": "b7326b70-1473-48b4-a30b-3eb9bb319541"
              }
            ...
          ]
          },
          "spectators": {
            "data": []
          }
        }
      "links": {
          "schema": "schema": "https://raw.githubusercontent.com/madglory/gamelocker-stunlock-studios-battlerite/master/schemas/1.0/match_index.json",
          "self": "https://api.dc01.gamelockerapp.com/shards/global/matches/D005654E95174996B303A17B979DC016"
      },
      "telemetry": [
        {
          "cursor": 499303,
          "type": "com.stunlock.service.matchmaking.avro.QueueEvent",
          "dataObject": {
            "time": 1509652368501,
            "userId": "867669421479563264",
            "teamId": "926118591642865664",
            "sessionId": "79DED2DF8F365B2978A57071E9E9028C",
            "season": 6,
            "eventType": "MATCH",
            "timeJoinedQueue": "34506717429220767",
            "timeInQueue": 2.0009074,
            "character": 543520739,
            "characterArchetype": 8,
            "queueTypes": ["QUICK2V2"],
            "limitMatchmakingRange": false,
            "regionSamples": [
              {
                "region": "eu-west",
                "latencyMS": 32
              },
              {
                "region": "na-northeast",
                "latencyMS": 110
              }
            ],
            "preferredRegion": "eu-west",
            "rankingType": "UNRANKED",
            "league": 0,
            "division": 2,
            "divisionRating": 0,
            "teamSize": 1,
            "teamMembers": [],
            "placementGamesLeft": 6,
            "matchId": "7260797FD85648B295DF0AA16E17A80D",
            "matchRegion": "eu-west",
            "teamSide": 1,
            "autoMatchmaking": true
          }
        },
      ...]
      },
  "included": [
      { ...}, //Player, Roster, Participant, asset, and Round structures
      ...
  ],
    "links": {
      ...
  },
    "meta": {}
  };
});

battleriteSdk.players.getPlayers({ filter: { playerIds: [123123] } }).then(function (playerInfo) {
  playerInfo = {
    "data": [{
      "type": "player",
      "id": "931405258914193408",
      "attributes": {
        "name": "",
        "patchVersion": "",
        "shardId": "",
        "stats": {
          ...
      }
      "titleId": ""
      },
      "relationships": {
        "assets": {
          "data": []
        }
      }],
      "links": {
        "schema": "https://raw.githubusercontent.com/madglory/gamelocker-/master/schemas/player_index.json",
        "self": "https://api.dc01.gamelockerapp.com/shards/global/players/931405258914193408"
      }
    }
  }
});

battleriteSdk.players.getPlayer(123123).then(function (playerInfo) {
  playerInfo = {
    "data": {
      "type": "player",
      "id": "931405258914193408",
      "attributes": {
        "name": "",
        "patchVersion": "",
        "shardId": "",
        "stats": {
          ...
      }
      "titleId": ""
      },
      "relationships": {
        "assets": {
          "data": []
        }
      },
      "links": {
        "schema": "https://raw.githubusercontent.com/madglory/gamelocker-/master/schemas/player_index.json",
        "self": "https://api.dc01.gamelockerapp.com/shards/global/players/931405258914193408"
      }
    }
  }
});

/**
 * Get BattleRite API status information
 */
battleriteSdk.status.getStatus().then(function (statusInfo) {
  statusInfo = {
    "data": {
      "type": "status",
      "id": "gamelocker",
      "attributes": {
        "releasedAt": "2017-11-22T20:25:05Z",
        "version": "v7.5.1"
      }
    }
  };
});
