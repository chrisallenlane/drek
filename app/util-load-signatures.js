const expand = require('expand-tilde');
const glob   = require('glob');
const lodash = require('lodash');
const yaml   = require('yamljs');

module.exports = function (options, config) {

  // restructure the signatures into a hash
  var signatures = [];

  // iterate over each signature file
  config.signatures.forEach(function (file) {

    // load each yaml file
    const yml       = yaml.load(file);
    const filetypes = yml.filetypes;

    // throw an error if a yaml file is invalid
    if (! lodash.isObject(yml)) {
      throw new Error(file + ' is not a valid YAML file.');
    }

    // throw an error if a yaml file contains no patterns
    if (lodash.isEmpty(yml.patterns)) {
      throw new Error(file + ' contains no patterns.');
    }

    // load the patterns
    yml.patterns.forEach(function (pattern) {
      signatures.push({
        signature : pattern,
        filetypes : filetypes.map(function (t) {
          return t.toLowerCase();
        }),
      });
    });
  });

  return signatures;
};
