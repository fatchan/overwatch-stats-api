'use strict';

const ow = require('overwatch-stats-api');

(async() => {
	const stats = await ow.getStats('HusseinObama-11715', 'pc');
	console.log(stats);
})();
