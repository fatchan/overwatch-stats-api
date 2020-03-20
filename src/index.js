'use strict';

const getHtml = require('./gethtml.js')
  , getBasicInfo = require('./basicinfo.js')
  , getHeroStats = require('./herostats.js')
  , getMostPlayed = require('./mostplayed.js');

async function getAllStats(battletag, platform) {
	
  const html = await getHtml(battletag, platform);
	
  const basicInfo = await module.exports.getBasicInfo(battletag, platform, html);
  const heroStats = await module.exports.getHeroStats(battletag, platform, html);
  const mostPlayed = await module.exports.getMostPlayed(battletag, platform, html);
	
  return {...basicInfo, heroStats: heroStats, mostPlayed: mostPlayed};
	
}

module.exports = {
  getAllStats: getAllStats, 
  getBasicInfo: getBasicInfo, 
  getHeroStats: getHeroStats, 
  getMostPlayed: getMostPlayed
};