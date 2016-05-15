/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2014-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var test = require('mukla')
var hybridify = require('./index')
var isPromise = require('is-promise')
var isBuffer = require('is-buffer')
var isArray = require('isarray')

test('hybridify(fn, ...args, cb) returns a promise', function () {
  var promise = hybridify(fs.readFile, './package.json', function (err, buf) {
    test.ifError(err)
    test.strictEqual(isBuffer(buf), true)
  })
  test.strictEqual(isPromise(promise), true)

  return promise.then(function (value) {
    test.strictEqual(isBuffer(value), true)
  })
})

test('hybridify.hybridify(fn) returns a function', function () {
  var statFile = hybridify.hybridify(fs.stat)
  test.strictEqual(typeof statFile, 'function')

  var count = 1
  var promise = statFile('./index.js', function (err, stats) {
    test.ifError(err)
    test.strictEqual(typeof stats, 'object')
    test.ok(stats.mtime)
    count++
  })
  test.strictEqual(isPromise(promise), true)

  return promise.then(function (value) {
    test.ok(value.mode)
    test.strictEqual(typeof value === 'object', true)
    test.strictEqual(count, 2)
  })
})

test('hybridify.hybridify(fn) work without final callback', function () {
  var readFile = hybridify.hybridify(fs.readFile)
  test.strictEqual(typeof readFile, 'function')

  var promise = readFile('./index.js')
  test.strictEqual(isPromise(promise), true)

  return promise.then(function (buf) {
    test.strictEqual(isBuffer(buf), true)
  })
})

test('hybridify.hybridify(fn) with only callback', function (done) {
  var readdir = hybridify.hybridify(fs.readdir)
  test.strictEqual(typeof readdir, 'function')

  readdir('./', function (err, files) {
    test.ifError(err)
    test.strictEqual(isArray(files), true)
    test.strictEqual(files.length > 1, true)
    done()
  })
})

test('hybridify.promisify(fn) return a function (alias for letta.promisify)', function () {
  var called = false
  var readdirPromised = hybridify.promisify(fs.readdir)
  var promise = readdirPromised('./', function callback () {
    /* istanbul ignore next */
    called = true
  })
  test.strictEqual(isPromise(promise), true)

  return promise.then(function (val) {
    test.strictEqual(isArray(val), true)
    test.strictEqual(val.length > 1, true)
    test.strictEqual(called, false)
  })
})
