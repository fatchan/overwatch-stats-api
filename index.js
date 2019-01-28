'strict mode';

const cheerio = require('cheerio')
	, fetch = require('node-fetch')

const heroIDMap =  {
	'0x02E00000FFFFFFFF': 'overall',
	'0x02E0000000000195': 'brigitte',
	'0x02E0000000000002': 'reaper',
	'0x02E0000000000003': 'tracer',
	'0x02E0000000000004': 'mercy',
	'0x02E0000000000005': 'hanzo',
	'0x02E0000000000006': 'torbjorn',
	'0x02E0000000000007': 'reinhardt',
	'0x02E0000000000008': 'pharah',
	'0x02E0000000000009': 'winston',
	'0x02E000000000000A': 'widowmaker',
	'0x02E0000000000015': 'bastion',
	'0x02E0000000000016': 'symmetra',
	'0x02E0000000000029': 'genji',
	'0x02E0000000000042': 'mccree',
	'0x02E0000000000065': 'junkrat',
	'0x02E0000000000068': 'zarya',
	'0x02E000000000006E': 'soldier',
	'0x02E0000000000079': 'lucio',
	'0x02E000000000007A': 'dva',
	'0x02E00000000000DD': 'mei',
	'0x02E000000000012E': 'sombra',
	'0x02E000000000013B': 'ana',
	'0x02E000000000013E': 'orisa',
	'0x02E00000000001A2': 'moira' 
}

module.exports.getStats = async (battletag, platform) => {
	
	const profileURL = encodeURI(`https://playoverwatch.com/en-us/career/${platform}/${battletag}`)
	
	//fetch profile
	let body;
	try {
		const res = await fetch(profileURL)
		if(!res || !res.ok) {
			throw new Error('PROFILE_NOT_FOUND')
		}
		body = await res.text()
	} catch (e) {
		console.error(e);
		throw e
	}
	
	//load into cheerio
	const $ = cheerio.load(body);

	//check if profile exists
	const found = $('.masthead-player').html();
	if (!found) {
		throw new Error('PROFILE_NOT_FOUND');	
	}

	//check if profile private
	const private = Boolean($('.masthead-permission-level-text').text() == 'Private Profile')
	if(private) {
		throw new Error('PROFILE_PRIVATE');
	}

	//this URL is for no stars
	let starsURL = $('.player-rank').attr('style').substring(21, $('.player-rank').attr('style').length-1);
	if (starsURL == 'https://d1u1mce87gyfbn.cloudfront.net/game/playerlevelrewards/0x025000000000095F_Rank.png') {
		starsURL = ''; 
	}

	//fill out the response
	let apiResponse = {
		dateFetched: Date.now(),
		battletag: battletag,
		rank: $('.competitive-rank').find('div').first().text(),
		level: $('.player-level').find('div').first().text(),
		endorsementLevel: ($('.endorsement-level').find('div').last().text() || 0),
		endorsements: {
			shotcaller: (($('.EndorsementIcon-border--shotcaller').attr('data-value')*100).toFixed() || 0),
			teammate: (($('.EndorsementIcon-border--teammate').attr('data-value')*100).toFixed() || 0),
			sportsmanship: (($('.EndorsementIcon-border--sportsmanship').attr('data-value')*100).toFixed() || 0)
		},
		heroStats: {},
		mostPlayed: {},
		profileURL: profileURL,
		iconURL: $('.player-portrait').attr('src'),
		rankIconURL: $('.competitive-rank').find('img').attr('src'),
		borderURL: $('.player-level').attr('style').substring(21, $('.player-level').attr('style').length-1),
		starsURL: starsURL
	}

	//add hero stats
	apiResponse.heroStats['competitive'] = getHeroStats($, 'competitive');
	apiResponse.heroStats['quickplay'] = getHeroStats($, 'quickplay');

	//add hero playtime
	apiResponse.mostPlayed['competitive'] = getMostPlayed($, 'competitive');
	apiResponse.mostPlayed['quickplay'] = getMostPlayed($, 'quickplay');
	
	return apiResponse;
	
}

function getHeroStats($, type) {
	
	const data = {};
	
	$('#'+type).find('[data-group-id=stats]').each(function() {
		const heroID = $(this).attr('data-category-id');
		//if we found a hero name
		if (heroID) {
			const heroName = heroIDMap[heroID];
			//hero stat object
			const statObj = {
				hero_specific: {},
				combat: {},
				assists: {},
				best: {},
				average: {},
				game: {},
				miscellaneous: {},
				match_awards: {}
			}
			if (heroName) {
				//look at the table data for info
				$(this).children().find('tr').each(function() {
					//get the category of this info by looking at table datas parents
					const category = $(this).parent().prevAll('thead').find('.stat-title').text().replace(/ /g, '_').toLowerCase();
					const snAsr = $(this).children();
					//some replacing for managing underscores/spaces
					let statname = snAsr.first().text().replace(/-/g, '');
					statname = statname.replace(/\s+/g, '_').replace(/\./g, '').toLowerCase();
					const statrslt = snAsr.last().text().replace(/,/g, '');
					if(category && statname && statrslt) {
						//add each of these categorised stats to the stat object
						statObj[category][statname] = statrslt;
					}
				});
				//then add all the stats for the hero to the main object
				data[heroName] = statObj;
			}
		}
	});
	
	return data;
	
}

function getMostPlayed($, type) {
	
	const data = {}
	
	$('#'+type).find('.career-section').first().find('[data-category-id="0x0860000000000021"]').first().find('.ProgressBar-title').each(function() {
		const timePlayed = $(this).next().text();
		const imgURL = $(this).parent().parent().prev().attr('src');
		const heroName = heroIDMap[imgURL.substring(imgURL.length-22, imgURL.length-4)];
		data[heroName] = { time: timePlayed, img: imgURL};
	});
	
	return data;
	
}