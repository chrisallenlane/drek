const config = require('../app/config');
const lodash = require('lodash');
const test   = require('tape');

const defaultConfig = function () {
  return {
    dateFormat : 'D MMMM YYYY, hh:mm A',

    signatures : [
      __dirname + '/mock/signatures/php.yml',
    ],

    ignore     : [
      '**/.git/**',
      '**/node_modules/**',
      '**/vendor/**',
    ]
  };
};


test('config: should return the correct default configs', function (t) {
  t.plan(3);

  const options = {};
  const configs = config(options, defaultConfig());

  const expectedSignatures = [
      __dirname + '/mock/signatures/php.yml',
  ];

  const expectedIgnore = [
    '**/.git/**',
    '**/node_modules/**',
    '**/vendor/**',
  ];

  t.equals(configs.dateFormat, 'D MMMM YYYY, hh:mm A');
  t.equals(lodash.isEqual(configs.signatures, expectedSignatures), true);
  t.equals(lodash.isEqual(configs.glob.ignore, expectedIgnore), true);
});


test('config: should allow configs to be overriden', function (t) {
  t.plan(3);

  // set config overrides
  const options = {
    '--ignore'     : [ 'foo' ],
    '--signatures' : __dirname + '/mock/signatures/php.yml',
  };
  const configs = config(options, defaultConfig());

  const expectedSignatures = [ __dirname + '/mock/signatures/php.yml' ];
  const expectedIgnore     = [ 'foo' ];

  t.equals(configs.dateFormat, 'D MMMM YYYY, hh:mm A');
  t.equals(lodash.isEqual(configs.signatures, expectedSignatures), true);
  t.equals(lodash.isEqual(configs.glob.ignore, expectedIgnore), true);
});
