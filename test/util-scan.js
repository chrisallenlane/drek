const path = require('path');
const scan = require('../app/util-scan');
const test = require('tape');

// mock a file to scan for matches
const file = path.resolve(__dirname, './mock/app/about.php');

// mock signatures
const signatures = [
  { signature: '\\s\\$_FILES' , filetypes: [ 'php' ] },
  { signature: '\\s\\$_GET'   , filetypes: [ 'php' ] },
  { signature: '\\s\\$_POST'  , filetypes: [ 'php' ] },
];


test('util-scan: should produce the appropriate matches', function (t) {
  t.plan(12);

  // mock the CLI options
  const options = {
    '--lines-after'  : '5',
    '--lines-before' : '5',
  };

  // perform the scan
  const matches = scan(file, [], options, signatures);

  // $_GET match
  t.equals(matches[0].id       , 1);
  t.equals(matches[0].filetype , 'php');
  t.equals(matches[0].search   , '\\s\\$_GET');
  t.equals(matches[0].line     , 12);
  t.equals(matches[0].start    , 7);
  t.equals(matches[0].end      , 18);

  // $_POST match
  t.equals(matches[1].id       , 2);
  t.equals(matches[1].filetype , 'php');
  t.equals(matches[1].search   , '\\s\\$_POST');
  t.equals(matches[1].line     , 10);
  t.equals(matches[1].start    , 5);
  t.equals(matches[1].end      , 16);
});


test('util-scan: should respect --lines-before and --lines-after', function (t) {
  t.plan(12);

  // mock the CLI options
  const options = {
    '--lines-after'  : '1',
    '--lines-before' : '1',
  };

  // perform the scan
  const matches = scan(file, [], options, signatures);

  // $_GET match
  t.equals(matches[0].id       , 1);
  t.equals(matches[0].filetype , 'php');
  t.equals(matches[0].search   , '\\s\\$_GET');
  t.equals(matches[0].line     , 12);
  t.equals(matches[0].start    , 11);
  t.equals(matches[0].end      , 14);

  // $_POST match
  t.equals(matches[1].id       , 2);
  t.equals(matches[1].filetype , 'php');
  t.equals(matches[1].search   , '\\s\\$_POST');
  t.equals(matches[1].line     , 10);
  t.equals(matches[1].start    , 9);
  t.equals(matches[1].end      , 12);
});
