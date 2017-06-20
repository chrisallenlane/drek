const lodash = require('lodash');

module.exports = function(matches) {

  return lodash.sortBy(matches, [
    'filetype',
    'search',
    'file',
    'line',
  ]);

};
