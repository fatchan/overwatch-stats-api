'use strict';

const cheerio = require('cheerio')
	, getHtml = require('./gethtml.js');

module.exports = async (battletag, platform, html) => {

	const $ = cheerio.load(html || await getHtml(battletag, platform));

	let starsURL = $('.player-rank').attr('style')
	if (starsURL) {
		starsURL = starsURL.substring(21, $('.player-rank').attr('style').length-1).trim();
		if (starsURL === 'https://d1u1mce87gyfbn.cloudfront.net/game/playerlevelrewards/0x025000000000095F_Rank.png') {
			starsURL = '';
		}
	}

	const data = {
		battletag: battletag,
		rank: $('.competitive-rank').find('div').first().text(),
		level: $('.player-level').find('div').first().text(),
		endorsementLevel: ($('.endorsement-level').find('div').last().text() || 0),
		endorsements: {
			shotcaller: (($('.EndorsementIcon-border--shotcaller').attr('data-value')*100).toFixed() || 0),
			teammate: (($('.EndorsementIcon-border--teammate').attr('data-value')*100).toFixed() || 0),
			sportsmanship: (($('.EndorsementIcon-border--sportsmanship').attr('data-value')*100).toFixed() || 0)
		},
		profileURL: encodeURI(`https://playoverwatch.com/en-us/career/${platform}/${battletag}`),
		iconURL: $('.player-portrait').attr('src'),
		rankIconURL: $('.competitive-rank').find('img').attr('src'),
		borderURL: $('.player-level').attr('style').substring(21, $('.player-level').attr('style').length-1).trim(),
		starsURL: starsURL
	}

	return data;

}
