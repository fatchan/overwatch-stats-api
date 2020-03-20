'use strict';

const cheerio = require('cheerio')
  , getHtml = require('./gethtml.js')
  , getPrestige = require('./prestige.js');

module.exports = async (battletag, platform, html) => {

  const $ = cheerio.load(html || await getHtml(battletag, platform));

  const borderURL = $('.player-level').attr('style').substring(21, $('.player-level').attr('style').length - 1).trim();
  let starsURL = $('.player-rank').attr('style');
  if (starsURL) {
    starsURL = starsURL.substring(21, $('.player-rank').attr('style').length - 1).trim();
    if (starsURL === 'https://d1u1mce87gyfbn.cloudfront.net/game/playerlevelrewards/0x025000000000095F_Rank.png') {
      starsURL = '';
    }
  }

  const rank = {};

  $('.competitive-rank-role').each((index, element) => {
    const roleIcon = $(element).find('.competitive-rank-role-icon').first().attr('src');
    const roleName = $(element).find('.competitive-rank-tier-tooltip').attr('data-ow-tooltip-text').split(' ')[0].toLowerCase();
    const tierIcon = $(element).find('.competitive-rank-tier-icon').attr('src');
    const sr = $(element).find('.competitive-rank-level').text();

    rank[roleName] = {
      sr,
      roleIcon,
      tierIcon
    };
  });

  const data = {
    battletag,
    rank,
    level: $('.player-level').find('div').first().text(),
    prestige: getPrestige(borderURL, starsURL) || '',
    endorsementLevel: ($('.endorsement-level').first().next().text() || 0),
    endorsements: {
      shotcaller: (($('.EndorsementIcon-border--shotcaller').attr('data-value') * 100).toFixed() || 0),
      teammate: (($('.EndorsementIcon-border--teammate').attr('data-value') * 100).toFixed() || 0),
      sportsmanship: (($('.EndorsementIcon-border--sportsmanship').attr('data-value') * 100).toFixed() || 0)
    },
    profileURL: encodeURI(`https://playoverwatch.com/en-us/career/${platform}/${battletag}`),
    iconURL: $('.player-portrait').attr('src'),
    borderURL,
    starsURL
  };

  return data;

};
