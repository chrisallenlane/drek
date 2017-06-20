const globify = require('../app/util-globify');
const path    = require('path');
const test    = require('tape');

test('util-globify: single source directory, single filetype', function(t) {
  t.plan(1);

  // mock signatures
  const signatures = [
    { signature : 'foo', filetypes : [ 'php' ] },
  ];

  t.equals(
    globify({ '<source-directory>' : [ 'app' ] }, signatures),
    'app/**/**.php'
  );
});


test('util-globify: single source directory, multiple filetypes', function(t) {
  t.plan(1);

  // mock signatures
  const signatures = [
    { signature : 'foo', filetypes : [ 'php' ] },
    { signature : 'bar', filetypes : [ 'js' ] },
  ];

  t.equals(
    globify({ '<source-directory>' : [ 'app' ] }, signatures),
    'app/**/**.{js,php}'
  );
});


test('util-globify: multiple source directories, single filetypes', function(t) {
  t.plan(1);

  // mock signatures
  const signatures = [
    { signature : 'foo', filetypes : [ 'php' ] },
  ];

  t.equals(
    globify({ '<source-directory>' : [ 'app', 'test' ] }, signatures),
    '{app,test}/**/**.php'
  );
});


test('util-globify: multiple source directories, multiple filetypes', function(t) {
  t.plan(1);

  // mock signatures
  const signatures = [
    { signature : 'foo', filetypes : [ 'php' ] },
    { signature : 'bar', filetypes : [ 'js' ] },
  ];

  t.equals(
    globify({ '<source-directory>' : [ 'app', 'test' ] }, signatures),
    '{app,test}/**/**.{js,php}'
  );
});
