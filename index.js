/**
 * hybridify <https://github.com/tunnckoCore/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var handleCallback = require('handle-callback');
var handleArguments = require('handle-arguments');
var thenify = require('thenify');

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
    var argz = handleArguments(arguments);

    var promise = thenify(asyncFn).apply(null, argz.args);
    if (argz.callback) {
      promise = handleCallback(promise, argz.callback);
    }

    return promise;
  }
}
