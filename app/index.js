#!/usr/bin/env node

// catch errors
process.on('uncaughtException', function (err) {
  console.warn(err);
  process.exit(1);
});

// require the dependencies
const decorators = require('./decorators');
const docopt     = require('docopt').docopt;
const fs         = require('fs');
const glob       = require('glob');
const globify    = require('./util-globify');
const path       = require('path');
const pkg        = require('../package.json');
const scan       = require('./util-scan');

// generate and parse the command-line options
const doc        = fs.readFileSync(path.join(__dirname, 'docopt.txt'), 'utf8');
const options    = docopt(doc, { version: pkg.version });

// load the config
const config     = require('./config')(options);

// load the signatures
const signatures = require('./util-load-signatures')(options, config);

// buffer the matches
var matches = [];

// identify the files to scan
glob(globify(options, signatures), config.glob, function (err, files) {

  // scan each file
  files.forEach(function (file) {
    matches = scan(file, matches, options, signatures);
  });

  // assert that a valid output format was specified
  if (decorators[options['--format']] === undefined) {
      throw new Error('Format "' + options['--format'] + '" is invalid.');
  }

  // select the appropriate decorator per --format
  const decorate = decorators[options['--format']];
  console.log(decorate(options, config, matches));
});
