const decorate = require('../app/decorate-csv');
const test     = require('tape');

test('decorate-csv: return a CSV string', function (t) {
  t.plan(1);

  // mock a (very simplified) array of matches
  const matches = [
    {
      id       : 1,
      filetype : 'js',
      file     : 'foo.js',
      search   : 'alpha',
      match    : 'alpha',
      line     : '1',
    },
    {
      id       : 2,
      filetype : 'js',
      file     : 'bar.js',
      search   : 'bravo',
      match    : 'bravo',
      line     : '1',
    },
  ];

  // stringified CSV representation of the above
  var csv = [
    '"id","filetype","file","search","match","line"',
    '1,"js","foo.js","alpha","alpha","1"',
    '2,"js","bar.js","bravo","bravo","1"',
  ].join('\n');

  // assert that the matches are stringified
  t.equals(decorate({}, {}, matches), csv);
});
