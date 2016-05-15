/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2014-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * > Make sync or async `fn` to support
 * promise and callback-style APIs in same time.
 *
 * **Example**
 *
 * ```js
 * const fs = require('fs')
 * const hybridify = require('hybridify')
 *
 * const promise = hybridify(fs.readFile, 'package.json', (err, buf) => {
 *   if (err) console.error('callback err:', err)
 *   console.log('callback res:', buf) // => '<Buffer 7b 0a 20 ...>'
 * })
 *
 * promise.then(buf => {
 *   console.log('promise res:', buf) // => '<Buffer 7b 0a 20 ...>'
 * }, err => {
 *   console.error('promise err:', err.stack)
 * })
 * ```
 *
 * @name   hybridify
 * @param  {Function} `<fn>` Some sync or asynchronous function.
 * @param  {Mixed} `[...args]` Any number of any type of arguments, they are passed to `fn`.
 * @return {Promise} Always Promise, always native Promise if supported on environment.
 * @api public
 */

var hybridify = module.exports = function hybridify (fn) {
  utils.relike.Promise = hybridify.Promise

  var names = utils.commonCallbackNames
  var argz = utils.handle(arguments, [null].concat(names))
  var promise = utils.relike.apply(this, argz.args)
  var resolved = utils.then(promise).then(argz.callback)

  return utils.normalizePromise(resolved, promise)
}

/**
 * > Wrapper function for `hybridify()`, but acts like `.promisify`
 * thingy. Accepts `fn` function and returns a function, which
 * when is called returns a Promise, but also can accept and calls
 * final callback if given.
 *
 * **Example**
 *
 * ```js
 * const fs = require('fs')
 * const hybridify = require('hybridify')
 * const readdir = hybridify.hybridify(fs.readdir)
 *
 * const promise = readdir('./', (err, files) => {
 *   if (err) console.error('callback err:', err)
 *   console.log('callback res:', files) // => array with directory files
 * })
 *
 * promise.then(files => {
 *   console.log('promise res:', files) // => array of files
 * }, err => {
 *   console.error('promise err:', err.stack)
 * })
 * ```
 *
 * @name   .hybridify
 * @param  {Function} `<fn>` Some sync or asynchronous function.
 * @param  {Function} `[Promize]` Promise constructor to be used on environment where no support for native.
 * @return {Function} Hybridified function, which always return a Promise.
 * @api public
 */

hybridify.hybridify = function hybridifyHybridify (fn, Promize) {
  var self = this

  function hybridified () {
    hybridify.Promise = Promize || hybridifyHybridify.Promise || hybridified.Promise
    return hybridify.apply(this || self, [fn].concat(utils.sliced(arguments)))
  }
  hybridified.__generatorFunction__ = fn

  return hybridified
}

/**
 * > Alias for [relike][]'s `.promisify` method. Almost the same as
 * the `.hybridify` method, but can't accept callback. When returned
 * function is called only returns a promise, not calls the final callback.
 *
 * **Example**
 *
 * ```js
 * const fs = require('fs')
 * const hybridify = require('hybridify')
 * const statPromised = hybridify.promisify(fs.statSync)
 *
 * statPromised('./index.js').then(stats => {
 *   console.log(stats.mode) // => mode of file
 * }, err => {
 *   console.error(err.stack)
 * })
 * ```
 *
 * @name   .promisify
 * @param  {Function} `<fn>` Some sync or asynchronous function.
 * @param  {Function} `[Promize]` Promise constructor to be used on environment where no support for native.
 * @return {Function} Promisified function, which always return a Promise.
 * @api public
 */

hybridify.promisify = function hybridifyPromisify (fn, Promize) {
  utils.relike.promisify.Promise = Promize || hybridifyPromisify.Promise
  return utils.relike.promisify.apply(this, arguments)
}
