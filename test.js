/**
 * hybridify <https://github.com/tunnckoCore/hybridify>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var hybridify = require('./index')
var assert = require('assert')


function somethingAsync(a, fn, callback) {
  callback(null, a, fn);
}

var asyncFn = hybridify(somethingAsync, function(err, res) {
  console.log(err);
  console.log('From callback', res);
  assert(res.length >= 1)

  var abc = res[0]
  var func = res[1]

  assert.strictEqual(abc, 'abc')
  assert.strictEqual(func('yeah'), 'YEAH')
})

asyncFn('abc', function func(a) {
  return a.toUpperCase();
})
.then(function fulfilled(res) {
  console.log('From then', res);
  assert(res.length >= 1)

  var abc = res[0]
  var func = res[1]

  assert.strictEqual(abc, 'abc')
  assert.strictEqual(func('yeah'), 'YEAH')
})
.catch(console.log)
