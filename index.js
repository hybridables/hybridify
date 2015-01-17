/**
 * hybridify <https://github.com/tunnckoCore/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var handleCallback = require('handle-callback');
var thenify = require('thenify');

/**
 * Building hybrid APIs. You can use both callback and promise in same time.
 * Like `fn(name, cb).then().catch()`
 *
 * @param  {Function} `fn`
 * @return {Function} when funcion is called return promise.
 * @api public
 */
module.exports = function hybridify(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('hybridify: expect `fn` to be function');
  }

  return function hybridifyFn() {
    var args = [].slice.call(arguments);
    var len = args.length;
    var callback = null;

    if (typeof args[len - 1] === 'function') {
      callback = args[len - 1];
      args = args.slice(0, -1);
    }

    var promise = thenify(fn).apply(null, args);
    if (callback) {
      promise = handleCallback(promise, callback);
    }

    return promise;
  }
}
