/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2014-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

var hybridify = module.exports = function hybridify (fn) {
  utils.letta.Promise = hybridify.Promise

  var names = utils.commonCallbackNames
  var argz = utils.handle(arguments, [null].concat(names))
  var promise = utils.letta.apply(this, argz.args)
  var resolved = utils.then(promise).then(argz.callback)

  return utils.normalizePromise(resolved, promise)
}

hybridify.hybridify = function hybridifyHybridify (fn, Promize) {
  var self = this

  function hybridified () {
    hybridify.Promise = Promize || hybridifyHybridify.Promise || hybridified.Promise
    return hybridify.apply(this || self, [fn].concat(utils.sliced(arguments)))
  }
  hybridified.__generatorFunction__ = fn

  return hybridified
}

hybridify.promisify = function hybridifyPromisify (fn, Promize) {
  utils.letta.promisify.Promise = Promize || hybridifyPromisify.Promise
  return utils.letta.promisify.apply(this, arguments)
}
