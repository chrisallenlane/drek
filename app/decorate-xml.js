const builder = require('xmlbuilder');
const sort    = require('./util-sort');

module.exports = function(options, config, matches) {

  // restructure the matches
  var obj = { matches: [] };
  sort(matches).forEach(function(match) {
    obj.matches.push({ match: match });
  });

  var xml = builder
    .create(obj)
    .end({ pretty: true });

  return xml;
};
