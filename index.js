/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var voa = require('voa')
var handleArguments = require('handle-arguments')

module.exports = hybridify

function hybridify (val) {
  var self = this

  function hybridified () {
    voa.promise = hybridify.promise || hybridified.promise
    var argz = handleArguments(arguments)
    var promise = voa.apply(self || this, [val].concat(argz.args))

    if (argz.callback) {
      promise = promise.then(function (res) {
        argz.callback.apply(self || this, [null].concat(res))
        return res
      }.bind(this), argz.callback.bind(self || this))
    }
    promise.hybridify = hybridify
    return promise
  }
  hybridified.hybridify = hybridify
  return hybridified
}
