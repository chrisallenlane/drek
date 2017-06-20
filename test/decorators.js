const decorators = require('../app/decorators');
const test       = require('tape');

test('decorators: return proper object', function (t) {
  t.plan(5);
  t.equals(Object.keys(decorators).length, 4);
  t.equals(typeof decorators.csv, 'function');
  t.equals(typeof decorators.html, 'function');
  t.equals(typeof decorators.json, 'function');
  t.equals(typeof decorators.xml, 'function');
});
