/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var letta = require('letta')
var thenCallback = require('then-callback')
var handleArguments = require('handle-arguments')

/**
 * > Hybridify sync, async or generator function.
 *
 * **Example**
 *
 * ```js
 * const hybridify = require('hybridify')
 * const fs = require('fs')
 *
 * // hybridify.promise = require('es6-promise')
 * const readFile = hybridify(fs.readFile)
 *
 * // readFile.promise = require('es6-promise')
 * readFile('./package.json', 'utf8')
 *   .then(JSON.parse)
 *   .then(console.log)
 * ```
 *
 * @name   hybridify
 * @param  {Function} `<fn>` function to hybridify, it can be sync/async/generator
 * @param  {Function} `[Prome]` custom promise constructor
 * @return {Function}
 * @api public
 */
module.exports = function hybridify (fn, Prome) {
  var self = this
  return function hybridified () {
    letta.promise = Prome || hybridify.promise || hybridified.promise
    var argz = handleArguments(arguments)
    var promise = letta.apply(self || this, [fn].concat(argz.args))
    return thenCallback(promise).then(argz.callback)
  }
}
