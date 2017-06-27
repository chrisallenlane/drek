const expand = require('expand-tilde');
const glob   = require('glob');
const lodash = require('lodash');
const yaml   = require('yamljs');


module.exports = function (options, config) {

  // resolve each signature glob into signature files
  var files = [];
  config.signatures.forEach(function (path) {
      files = files.concat(glob.sync(expand(path)));
  });

  // sort and de-dup the files
  files = lodash(files).sort().uniq().value();

  // throw an error is no files are specified
  if (lodash.isEmpty(files)) {
    throw new Error('No signatures were specified.');
  }

  // iterate over each signature file
  var signatures = [];
  files.forEach(function (file) {

    // load each yaml file
    const yml = yaml.load(file);

    // throw an error if a yaml file is invalid
    if (! lodash.isObject(yml)) {
      throw new Error(file + ' is not a valid YAML file.');
    }

    // throw an error if a yaml file contains no filetypes
    if (lodash.isEmpty(yml.filetypes)) {
      throw new Error(file + ' contains no filetypes.');
    }

    // throw an error if a yaml file contains no patterns
    if (lodash.isEmpty(yml.patterns)) {
      throw new Error(file + ' contains no patterns.');
    }

    const filetypes = yml.filetypes;

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
