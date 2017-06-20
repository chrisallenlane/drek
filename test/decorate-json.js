const decorate = require('../app/decorate-json');
const test     = require('tape');

test('decorate-json: return a JSON string', function (t) {
  t.plan(1);

  // mock a (very simplified) array of matches
  const matches = [{ foo : 'bar' }];

  // assert that the matches are stringified
  t.equals(
    decorate({}, {}, matches),
    JSON.stringify(matches, null, ' ')
  );
});
