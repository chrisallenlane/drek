const glob = require('glob');
const rc   = require('rc');

module.exports = function(options, config) {

  // NB: the `config` parameter exists strictly to allow for unit-testing. It
  // is not used under non-testing circumstances.
  if (! config) {
    // load configs from ~/.drekrc
    config = rc('drek', {

        // HTML report date formatting 
        dateFormat : 'D MMMM YYYY, hh:mm A',
        ignore     : [],
      },

      // no-op the argument parser (because we're using docopt for this)
      function() {}
    );
  }

  // glob module configs
  config.glob = {};

  // --ignore config override
  config.glob.ignore = (options['--ignore'])
    ? options['--ignore']
    : config.ignore ;

  // determine the signature paths
  config.signatures =
    (options['--signatures']) ? [ options['--signatures'] ]:
    (config.signatures)       ? config.signatures : [] ;

  // return the config object
  return config;
};
