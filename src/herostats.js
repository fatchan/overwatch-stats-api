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
		
    // find stat groups (grouping per-hero or "overall")
    $('#' + type).find('[data-group-id=stats]').each(function() {
			
      // check for hero ID
      const heroID = $(this).attr('data-category-id');
      if (heroID) {
				
        // get the hero name
        const heroName = heroIDMap[heroID];
        if (heroName) {
					
          // hero stat object
          const hero = {
            hero_specific: {},
            combat: {},
            assists: {},
            best: {},
            average: {},
            game: {},
            miscellaneous: {},
            match_awards: {}
          };
					
          // look at the table data for info
          $(this).find('.stat-title').each(function() {
            // get the category of this info by looking at table header
            const category = $(this).text().replace(/\s+/g, '_').toLowerCase();
            $(this).parent().parent().parent().next().children().each(function() {
              const row = $(this).children();
              const stat = row.first().text()
                .replace(/-/g, '') // remove - for "x - most in game" stats
                .replace(/\s+/g, '_') // replace spaces with underscores
                .toLowerCase();
              const result = row.last().text().replace(/,/g, '');
              hero[category][stat] = result;
            });
          });
          // then add all the stats for the hero to the main object
          data[type][heroName] = hero;
        }
      }
    });
  });

  return data;
	
};