const load   = require('../app/util-load-signatures');
const lodash = require('lodash');
const path   = require('path');
const test   = require('tape');


test('util-load-signatures: it should load signature files', function (t) {
  t.plan(1);
  
  // stub configs
  const config = {
    signatures: [
      __dirname + '/mock/signatures/js.yml',
      __dirname + '/mock/signatures/php.yml',
    ],
  };
  
  // expected signatures
  const expected = [
    { signature : '\\sconsole'     , filetypes : [ 'js'  ] } ,
    { signature : '\\seval\\s*\\(' , filetypes : [ 'js'  ] } ,
    { signature : '\\s\\$_GET'     , filetypes : [ 'php' ] } ,
    { signature : '\\s\\$_POST'    , filetypes : [ 'php' ] } ,
    { signature : '\\seval\\s*\\(' , filetypes : [ 'php' ] } , 
  ];

  // assert that the returned signatures match the expected
  t.equals(
    lodash.isEqual(load({}, config), expected),
    true
  );
});


test('util-load-signatures: it should throw an error on badly formatted YAML', function (t) {
  t.plan(1);
  
  // stub configs
  const config = {
    signatures: [
      __dirname + '/mock/signatures/php.badyml',
    ],
  };

  // assert that an error is thrown
  t.throws(
    function () { load({}, config); },
    /is not a valid YAML file/ 
  );
});


test('util-load-signatures: it should throw an error if a signature file contains no patterns', function (t) {
  t.plan(1);
  
  // stub configs
  const config = {
    signatures: [
      __dirname + '/mock/signatures/php.emptyyml',
    ],
  };

  // assert that an error is thrown
  t.throws(
    function () { load({}, config); },
    /contains no patterns./ 
  );
});
