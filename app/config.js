const expand = require('expand-tilde');
const glob   = require('glob');
const lodash = require('lodash');
const rc     = require('rc');

module.exports = function(options, config) {

  // NB: the `config` parameter exists strictly to allow for unit-testing. It
  // is not used under non-testing circumstances.
  if (! config) {
    // load configs from ~/.drekrc
    config = rc('drek', {

        // HTML report date formatting 
        dateFormat : 'D MMMM YYYY, hh:mm A',
        signatures : [],
        ignore     : [],
      },

      // no-op the argument parser (because we're using docopt for this)
      function() {}
    );
  }

  // glob module configs
  config.glob = {};

  // --ignore config override
  config.glob.ignore = (! lodash.isEmpty(options['--ignore']))
    ? options['--ignore']
    : config.ignore ;

  // process --signatures if provided
  if (! lodash.isEmpty(options['--signatures'])) {
    // do a glob search on --signatures to expand wildcards and such
    config.signatures = glob.sync(expand(options['--signatures']));
  }

  // otherwise, load from the `.drekrc file`.
  else if (! config.signatures)  {
    var signatures = [];
    config.signatures.forEach(function (file) {
      // do a glob search on --signatures to expand wildcards and such
      signatures = signatures.concat(glob.sync(expand(file)));
    });

    config.signatures = lodash(signatures).sort().uniq().value();
  }

  // return the config object
  return config;
};
