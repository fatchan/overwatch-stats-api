'use strict';

const fetch = require('node-fetch')
  , cheerio = require('cheerio');

module.exports = async (battletag, platform) => {
	
  const url = encodeURI(`https://playoverwatch.com/en-us/career/${platform}/${battletag}`);
	
  const res = await fetch(url);
  if (!res || !res.ok) {
    throw new Error('PROFILE_NOT_FOUND');
  }
	
  const html = await res.text();
	
  // load into cheerio
  const $ = cheerio.load(html);

  // check if profile exists
  if (!$('.masthead-player').html()) {
    throw new Error('PROFILE_NOT_FOUND');	
  }

  // check if profile private
  if ($('.masthead-permission-level-text').text() === 'Private Profile') {
    throw new Error('PROFILE_PRIVATE');
  }
	
  return html;
	
};