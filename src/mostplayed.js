'use strict';

const cheerio = require('cheerio')
  , getHtml = require('./gethtml.js')
  , heroIDMap = require('./heroids.json');

module.exports = async (battletag, platform, html) => {
	
  const $ = cheerio.load(html || await getHtml(battletag, platform));
	
  const data = {
    quickplay: {},
    competitive: {}
  };
	
  ['competitive', 'quickplay'].forEach(type => {
    $('#' + type).find('.career-section').first().find('[data-category-id="0x0860000000000021"]').first().find('.ProgressBar-title').each(function() {
      const timePlayed = $(this).next().text();
      const imgURL = $(this).parent().parent().prev().attr('src');
      const heroID = imgURL.substring(imgURL.length - 22, imgURL.length - 4);
      const heroName = heroIDMap[heroID];

      data[type][heroName] = { time: timePlayed, img: imgURL};
    });
  });

  return data;

};