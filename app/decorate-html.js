const Prism  = require('node-prismjs');
const ejs    = require('ejs');
const fs     = require('fs');
const lodash = require('lodash');
const moment = require('moment');
const path   = require('path');
const sort   = require('./util-sort');
const uuid   = require('uuid-v4');

module.exports = function(options, config, matches) {
  
  // app ejs template
  const template = fs.readFileSync(
    path.resolve(__dirname, 'static/app.ejs'),
    'utf8'
  );

  // app css
  const styles = {
    // external stylesheets
    external: [
      'https://cdnjs.cloudflare.com/ajax/libs/Primer/3.0.1/css/primer.css',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-solarizedlight.min.css',
    ],

    // embedded CSS
    embedded: fs.readFileSync(
      path.resolve(__dirname, 'static/app.css'),
      'utf8'
    ),
  };

  // app javascript
  const scripts = {

    // external scripts (cdnjs)
    external: [
      //'https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.4/vue.js',
      'https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.4/vue.min.js',
      //'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js',
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js',
    ],

    // embedded javascript
    embedded: fs.readFileSync(
      path.resolve(__dirname, 'static/app.js'),
      'utf8'
    ),

  };

  // pluck the filetypes that were used 
  const filetypes = lodash(matches)
    .countBy('filetype')
    .toPairs()
    .sortBy(function(pair) {
      return pair[0];
    })
    .value();
  filetypes.unshift([
    'all',
    matches.length,
  ]);

  // structure the search results for navigation
  var tmp = {};
  matches.forEach(function (match) {
    var path  = [ match.filetype, match.search ].join('.');
    var value = lodash.get(tmp, path, 0);
    lodash.set(tmp, path, ++value);
  });
  searches = [];
  Object.keys(tmp).forEach(function (filetype) {
    lodash.toPairs(tmp[filetype]).forEach(function (pair) {
      searches.push({
        filetype : filetype,
        search   : pair[0],
        count    : pair[1],
      });
    });
  });
  searches = lodash.sortBy(searches, 'search');

  // decorate the matches
  matches = matches.map(function (match) {
    
    // set a default match severity
    match.severity = 'unknown';

    // set a default (empty) note
    match.note = '';

    // apply syntax-highlighting to entire match
    match.match = Prism.highlight(
      match.match,
      Prism.languages.autoit
    );

    // preprend line numbers to each line
    var number = match.start;
    match.match = match.match.split('\n').map(function (line) {
      var numbered = '<span class="line-number">' + (number) + ':</span> ' + line;

      // highlight the lines on which matches occur
      if (number === match.line) {
        numbered = '<span class="highlight">' + numbered + '</span>';
      }

      // increment the line number
      number++;

      // return the numbered line
      return numbered;
    }).join('\n');

    // done
    return match;
  });

  // format the template data
  const data = {
    meta: {
      date      : moment(new Date()).format(config.dateFormat),
      project   : options['--project'],
      scripts   : scripts,
      storage   : 'drek-' + uuid(),
      styles    : styles,
    },
    filetype   : 'all',
    filetypes  : JSON.stringify(filetypes, null, ' '),
    matches    : JSON.stringify(sort(matches), null, ' '),
    searches   : JSON.stringify(searches, null, ' '),
    severities : JSON.stringify([ 'ok', 'warn', 'critical', 'unknown' ]),
  };

  // render the ejs
  return ejs.render(template, data, {});
};
