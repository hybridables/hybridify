/**
 * hybridify <https://github.com/tunnckoCore/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var handleCallback = require('handle-callback');
var thenify = require('thenify');
var slice = require('array-slice');

/**
 * Building hybrid APIs. You can use both callback and promise in same time.
 * Like `asyncFn(name, cb).then().catch()`
 *
 * @param  {Function} `asyncFn`
 * @return {Function} when funcion is called return promise.
 * @api public
 */
module.exports = function hybridify(asyncFn) {
  if (typeof asyncFn !== 'function') {
    throw new TypeError('hybridify: expect `asyncFn` to be function');
  }

  return function hybridifyFn() {
    var args = slice(arguments);
    var len = args.length;
    var callback = null;
    var last = args[len - 1];

    if (typeof last === 'function') {
      callback = last;
      args = args.slice(0, -1);
    }

    var promise = thenify(asyncFn).apply(null, args);
    if (callback) {
      promise = handleCallback(promise, callback);
    }

    return promise;
  }
}
