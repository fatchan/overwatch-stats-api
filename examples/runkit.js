const ow = require('overwatch-stats-api');

const stats = await ow.getAllStats('HusseinObama-11715', 'pc');
console.log(stats);