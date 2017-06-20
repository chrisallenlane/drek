const lodash = require('lodash');

module.exports = function(options, signatures) {

  // format the desired source directories
  const directories = (options['<source-directory>'].length === 1)
    ? options['<source-directory>'][0]
    : '{' + options['<source-directory>'].join(',') + '}';

  // get the file extensions in use
  const extensions = lodash(signatures)
    .map('filetypes')
    .flatten()
    .sort()
    .uniq()
    .value();

  // format and return the glob
  return (extensions.length >= 2)
    ? directories + '/**/**.{' + extensions + '}'
    : directories + '/**/**.' + extensions;
};
