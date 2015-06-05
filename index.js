/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var handleArguments = require('handle-arguments')
var handleCallback = require('handle-callback')
var alwaysPromise = require('always-promise')

module.exports = hybridify

function hybridify (fn) {
  function hybridifyFn () {
    var argz = handleArguments(arguments)
    var promise = alwaysPromise(fn).apply(fn, argz.args)

    if (argz.callback) {
      promise = handleCallback(promise, argz.callback)
    }

    promise.hybridify = hybridify
    return promise
  }

  hybridifyFn.hybridify = hybridify
  return hybridifyFn
}
