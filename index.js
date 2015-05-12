/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var Bluebird = require('bluebird')
var handleArguments = require('handle-arguments')

module.exports = hybridify

function hybridify (asyncFn) {
  function hybridifyFn () {
    var argz = handleArguments(arguments)
    var fn = Bluebird.promisify(asyncFn)
    var promise = fn.apply(fn, argz.args)

    promise.hybridify = hybridify

    if (argz.callback) {
      return promise.nodeify(argz.callback)
    }
    return promise
  }

  hybridifyFn.hybridify = hybridify
  return hybridifyFn
}
