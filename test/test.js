'use strict';

const ow = require('../src/index.js');

(async() => {
	const stats = await ow.getStats('HusseinObama-11715', 'pc');
	console.log(stats);
})();
