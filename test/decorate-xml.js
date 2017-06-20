const decorate = require('../app/decorate-xml');
const test     = require('tape');

test('decorate-xml: return a xml string', function (t) {
  t.plan(1);

  // mock a (very simplified) array of matches
  const matches = [{ foo : 'bar' }];

  // stringified XML representation of the above
  var xml = [
  '<?xml version="1.0"?>',
    '<matches>',
    '  <match>',
    '    <foo>bar</foo>',
    '  </match>',
    '</matches>',
  ].join('\n');

  // assert that the matches are stringified
  t.equals( decorate({}, {}, matches), xml);
});
