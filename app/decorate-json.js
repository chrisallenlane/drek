module.exports = function(options, config, matches) {
  return JSON.stringify(matches, null, ' ');
};
