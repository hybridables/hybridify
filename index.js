/**
 * hybridify <https://github.com/tunnckoCore/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var handleCallback = require('handle-callback');
var handleArguments = require('handle-arguments');
var isEmptyFunction = require('is-empty-function');
var thenify = require('thenify');

/**
 * Building hybrid APIs. You can use both callback and promise in same time.
 * Like `asyncFn(name, cb).then().catch()`
 *
 * **Example:**
 *
 * ```js
 * var hybridify = require('hybridify');
 *
 * var hybrid = hybridify(function asyncFn(a, b, c, callback) {
 *   callback(null, a, b, c);
 * });
 *
 * // both in same time!
 * hybrid(1, 2, 3, function(err, res) {
 *   console.log('CALLBACK err:', err);
 *   console.log('CALLBACK res:', res);
 * })
 * .then(function(res) {
 *   console.log('PROMISE res:', res);
 * })
 * .catch(function(err) {
 *   console.log('PROMISE err:', err);
 * })
 * ```
 *
 * @name hybridify
 * @param  {Function} `<asyncFn>` function to hybridify
 * @return {Function} when funcion is called return promise
 * @api public
 */
var hybridify = module.exports = hybridify;

function hybridify(asyncFn) {
  if (typeof asyncFn !== 'function') {
    throw new TypeError('hybridify: expect `asyncFn` to be function');
  }

  function hybridifyFn() {
    var argz = handleArguments(arguments);
    var cb = argz.callback;

    var promise = thenify(asyncFn).apply(null, argz.args);
    if (!isEmptyFunction(cb) && cb.name !== 'defaultHandleArgumentsCallback') {
      promise = handleCallback(promise, cb);
    }
    promise.hybridify = hybridify;
    return promise;
  }

  hybridifyFn.hybridify = hybridify
  return hybridifyFn;
}
