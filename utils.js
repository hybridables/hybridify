'use strict'

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require)

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign

/**
 * Lazily required module dependencies
 */

require('common-callback-names')
require('handle-arguments', 'handle')
require('relike')
require('sliced')
require('then-callback', 'then')

/**
 * Restore `require`
 */

require = fn // eslint-disable-line no-undef, no-native-reassign

utils.normalizePromise = function normalizePromise (target, promise) {
  target.Promise = promise.Promise
  target.___customPromise = promise.___customPromise
  target.___bluebirdPromise = promise.___bluebirdPromise
  return target
}

/**
 * Expose `utils` modules
 */

module.exports = utils
