/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var hybridify = require('./index')

var got = require('got')
var hybridGot = hybridify(got.get)

test('hybridify:', function () {
  test('should work', function () {
    test('with callback api', function (done) {
      hybridGot('https://github.com', function (err, res) {
        test.ifError(err)
        test.equal(res.length, 2)
        test.equal(res[0][0], '<')
        done()
      })
    })
    test('with promise api', function (done) {
      hybridGot('https://github.com').then(function (res) {
        test.equal(res.length, 2)
        test.equal(res[0][0], '<')
        done()
      })
    })
    test('with both callback and promise api', function (done) {
      var cnt = 0

      hybridGot('https://github.com', function (err, res) {
        test.ifError(err)
        test.equal(res.length, 2)
        test.equal(res[0][0], '<')
        cnt++
      })
      .then(function (res) {
        test.equal(cnt, 1)
        test.equal(res.length, 2)
        test.equal(res[0][0], '<')
        done()
      })
    })
  })
  test('should be able to create own hybrids', function () {
    test('every hybrid have `.hybridify` method', function (done) {
      var hybrid = hybridGot('https://github.com')

      test.equal(typeof hybrid.hybridify, 'function')
      test.equal(typeof hybridGot.hybridify, 'function')
      done()
    })
    test('every hybrid is promise and have `.then` and `.catch` methods', function (done) {
      var hybrid = hybridGot('https://github.com')

      test.equal(typeof hybrid.then, 'function')
      test.equal(typeof hybrid.catch, 'function')
      done()
    })
  })
  test('should be able to catch error', function () {
    test('with callback api', function (done) {
      hybridGot('https://gitfsdfsdfm', function (err, res) {
        // callback api
        test.ifError(!err)
        test.equal(res, null || undefined)
        done()
      })
    })
    test('with promise api - with .catch(err)', function (done) {
      hybridGot('https://gitfsdfsdfm')
      .catch(function (err) {
        test.ifError(!err)
        test.ok(err.message)
        done()
      })
    })
    test('with both callback and promise api', function (done) {
      var cnt = 0

      hybridGot('https://gitfsdfsdfm', function (err) {
        test.ifError(!err)
        cnt++
      })
      .catch(function (err) {
        test.ifError(!err)
        test.equal(cnt, 1)
        done()
      })
    })
  })
})
