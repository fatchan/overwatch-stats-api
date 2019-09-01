# overwatch-stats-api

![downloads](https://img.shields.io/npm/dt/overwatch-stats-api.svg?style=flat)
![version](https://img.shields.io/npm/v/overwatch-stats-api.svg?style=flat)


Get stats from Blizzard's career profile pages.

https://playoverwatch.com/en-us/career/PLATFORM/BATTLETAG

Gets rank level, endorsements, hero stats and most played time for quickplay and competitive.

### Example
```js
const ow = require('overwatch-stats-api');
(async () => {
  const stats = await ow.getAllStats('HusseinObama-11715', 'pc');
  console.log(stats);
})();
```

### Please note
 - Profiles in Overwatch are private by default and this module can only get stats that are publicly available. You can make your profile public in game under options -> social -> career profile visibility: PUBLIC
 - Profile visibility and the profile stats in general only update upon exiting the game: they may take some time to update on Blizzard's website and therefore through this module.
 - Because this module gets the profile page and parses it, best practice would be to simply use `getAllStats()` and cache it for some time, using each part as needed since accessing and downloading the whole page multiple times for each different section of stats will result in excessive hits to Blizzard's site and could potentially lead to ratelimits.
 - This module does not do any caching and you should definitely consider this if using it in some kind of web API application.

### Methods
`battletag` are Blizzard battletags in the `"NAME-DISCRIMINATOR"` format (e.g. `"xQc-11273"`) and are case sensitive.  
`platform` can be either `pc`, `xbl` or `psn` for PC, Xbox Live and PlayStation Network profiles respectively.

#### getAllStats(battletag, platform)
Get all stats from other 3 methods combined.  
For an updated full response please see the [demo](#demo).
```js
{
    "battletag": "HusseinObama-11715",
    "rank": {
      "damage": {
        "sr": "4021",
        "roleIcon": "https://static.playoverwatch.com/img/pages/career/icon-offense-6267addd52.png",
        "tierIcon": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-GrandmasterTier.png"
      },
      "support": {
        "sr": "3766",
        "roleIcon": "https://static.playoverwatch.com/img/pages/career/icon-support-46311a4210.png",
        "tierIcon": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-MasterTier.png"
      },
      "tank": {
        "sr": "3556",
        "roleIcon": "https://static.playoverwatch.com/img/pages/career/icon-tank-8a52daaf01.png",
        "tierIcon": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-MasterTier.png"
      }
    },
    "level": "42",
    "prestige": "8",
    "endorsementLevel": "2",
    "endorsements": {
        "shotcaller": "22",
        "teammate": "58",
        "sportsmanship": "20"
    },
    "profileURL": "https://playoverwatch.com/en-us/career/pc/HusseinObama-11715",
    "iconURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f5a1929df2af047300e2fe438c1a6ee6a349b47c82a86198540ca43e89ed5ceb.png",
    "borderURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ba68d2c0f1b55e1991161cb1f88f369b97311452564b200ea1da226eb493e2e8.png",
    "starsURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/426c754c76cd12e6aacd30293a67363571341eea37880df549d3e02015a588fe.png",
    "heroStats": {
    "competitive": {
      "overall": {
        "combat": { ... },
        "assists": { ... },
        "best": { ... },
        "average": { ... },
        "game": { ... },
        "miscellaneous": { ... },
        "match_awards": { ... },
      },
      "ana": {
          ...
      },
      ...
    },
    "quickplay": {
      ...
    }
  },
  "mostPlayed": {
    "competitive": {
      "mei": {
        "time": "16:05:18",
        "img": "https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/0x02E00000000000DD.png"
      },
      "dva": {
        ...
      },
      ...
    },
    "quickplay": {
      ...
    }
  }
}
```

##### getBasicInfo(battletag, platform)
Get basic info like rank, level, endorsements and link to profile, stars and border images.
```js
{
    "battletag": "HusseinObama-11715",
    "rank": {
      "damage": {
        "sr": "4021",
        "roleIcon": "https://static.playoverwatch.com/img/pages/career/icon-offense-6267addd52.png",
        "tierIcon": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-GrandmasterTier.png"
      },
      "support": {
        "sr": "3766",
        "roleIcon": "https://static.playoverwatch.com/img/pages/career/icon-support-46311a4210.png",
        "tierIcon": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-MasterTier.png"
      },
      "tank": {
        "sr": "3556",
        "roleIcon": "https://static.playoverwatch.com/img/pages/career/icon-tank-8a52daaf01.png",
        "tierIcon": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-MasterTier.png"
      }
    },
    "level": "42",
    "prestige": "8",
    "endorsementLevel": "2",
    "endorsements": {
        "shotcaller": "22",
        "teammate": "58",
        "sportsmanship": "20"
    },
    "profileURL": "https://playoverwatch.com/en-us/career/pc/HusseinObama-11715",
    "iconURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f5a1929df2af047300e2fe438c1a6ee6a349b47c82a86198540ca43e89ed5ceb.png",
    "rankIconURL": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-PlatinumTier.png",
    "borderURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ba68d2c0f1b55e1991161cb1f88f369b97311452564b200ea1da226eb493e2e8.png",
    "starsURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/426c754c76cd12e6aacd30293a67363571341eea37880df549d3e02015a588fe.png"
}
```


##### getHeroStats(battletag, platform)
Get hero stats for competitive and quickplay with categories under each hero and an "overall" hero for overall stats in that mode
categories are combat, assists, best, average, game, miscellaneous and match_awards.
```js
{
  "competitive": {
    "overall": {
      "combat": { ... },
      "assists": { ... },
      "best": { ... },
      "average": { ... },
      "game": { ... },
      "miscellaneous": { ... },
      "match_awards": { ... },
    },
    "ana": {
        ...
    },
    ...
  },
  "quickplay": {
    ...
  }
}
```


##### getMostPlayed(battletag, platform)
Get the most played heros for competitive and quickplay with a HH:MM:SS time string and link to their thumbnail image in descending order of time played.
```js
{
  "competitive": {
    "mei": {
      "time": "16:05:18",
      "img": "https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/0x02E00000000000DD.png"
    },
    "dva": {
      ...
    },
    ...
  },
  "quickplay": {
    ...
  }
}
```

### Rejections
These methods return promises that are sometimes rejected with an `Error`:
- If the profile can't be found: `Error('PROFILE_NOT_FOUND');`
- If the profile is private. `Error('PROFILE_PRIVATE');`

### Demo
You can try this package with [RunKit](https://npm.runkit.com/overwatch-stats-api).
