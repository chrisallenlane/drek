const csv  = require('json2csv');
const sort = require('./util-sort');

module.exports = function(options, config, matches) {

  // csv fields
  const fields = [
    'id',
    'filetype',
    'file',
    'search',
    'match',
    'line',
  ];

  return csv({ data: sort(matches), fields: fields });
};
