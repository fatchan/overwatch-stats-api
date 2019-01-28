# overwatch-stats-api

get stats from blizzard career profile pages

https://playoverwatch.com/en-us/career/PLATFORM/BATTLETAG

Gets rank level, endorsements, hero stats and most played time for quickplay and competitive.

#### Usage
```
const ow = require('overwatch-stats-api');

const stats = await ow.getStats('HusseinObama-11715', 'pc');

console.log(stats)
```

Example data
```
{
    "dateFetched": 1548640266024,
    "battletag": "HusseinObama-11715",
    "rank": "2655",
    "level": "42",
    "endorsementLevel": "2",
    "endorsements": {
        "shotcaller": "22",
        "teammate": "58",
        "sportsmanship": "20"
    },
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
        }
    },
    "profileURL": "https://playoverwatch.com/en-us/career/pc/HusseinObama-11715",
    "iconURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f5a1929df2af047300e2fe438c1a6ee6a349b47c82a86198540ca43e89ed5ceb.png",
    "rankIconURL": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-PlatinumTier.png",
    "borderURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ba68d2c0f1b55e1991161cb1f88f369b97311452564b200ea1da226eb493e2e8.png",
    "starsURL": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/426c754c76cd12e6aacd30293a67363571341eea37880df549d3e02015a588fe.png"
}


```
