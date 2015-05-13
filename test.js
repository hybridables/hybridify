/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var test = require('assertit')
var hybridify = require('./index')

var got = require('got')
var hybridGot = hybridify(got.get)

test('hybridify:', function () {
  test('should work', function () {
    test('with callback api', function (done) {
      // this.timeout(10000)

      hybridGot('https://github.com', function (err, res) {
        var body = res[0]
        var stream = res[1]
        // callback api

        test.assert.strictEqual(err, null)
        test.assert.ok(res)
        test.assert.ok(stream)
        test.assert.strictEqual(body[0], '<') // it is html
        done()
      })
    })

    test('with promise api', function (done) {
      // this.timeout(10000)

      hybridGot('https://github.com')
      .then(function (res) {
        var body = res[0]
        var stream = res[1]
        // promise api

        test.assert.ok(res)
        test.assert.ok(stream)
        test.assert.strictEqual(body[0], '<') // it is html
        done()
      })
    })

    test('with both callback and promise api', function (done) {
      // this.timeout(10000)
      var i = 0

      hybridGot('https://github.com', function (err, res) {
        var body = res[0]
        var stream = res[1]
        // callback api
        i++
        test.assert.strictEqual(err, null)
        test.assert.ok(res)
        test.assert.ok(stream)
        test.assert.strictEqual(body[0], '<') // it is html
      })
      .then(function (res) {
        var body = res[0]
        var stream = res[1]
        // promise api
        test.assert.strictEqual(i, 1)
        test.assert.ok(res)
        test.assert.ok(stream)
        test.assert.strictEqual(body[0], '<') // it is html
        done()
      })
    })
  })

  test('should be able to create own hybrids', function () {
    test('every hybrid have `.hybridify` method', function (done) {
      var hybrid = hybridGot('https://github.com')

      test.assert.strictEqual(typeof hybrid.hybridify, 'function')
      test.assert.strictEqual(typeof hybridGot.hybridify, 'function')
      done()
    })
    test('every hybrid is promise and have `.then` and `.catch` methods', function (done) {
      var hybrid = hybridGot('https://github.com')

      test.assert.strictEqual(typeof hybrid.then, 'function')
      test.assert.strictEqual(typeof hybrid.catch, 'function')
      test.assert.strictEqual(typeof hybrid.hybridify, 'function')
      test.assert.strictEqual(typeof hybridGot.hybridify, 'function')
      done()
    })
  })

  test('should be able to catch error', function () {
    test('with callback api', function (done) {
      // this.timeout(10000)

      hybridGot('https://gitfsdfsdfm', function (err, res) {
        // callback api
        test.assert.ifError(!err)
        test.assert.ok(err.message)
        test.assert.strictEqual(res, null || undefined)
        done()
      })
    })

    test('with promise api - with .catch(err)', function (done) {
      // this.timeout(10000)

      hybridGot('https://gitfsdfsdfm')
      .catch(function (err) {
        // promise api
        test.assert.ifError(!err)
        test.assert.ok(err.message)
        done()
      })
    })

    test('with both callback and promise api', function (done) {
      // this.timeout(10000)
      var i = 0
      hybridGot('https://gitfsdfsdfm', function (err) {
        // callback api
        i++
        test.assert.ifError(!err)
        test.assert.ok(err.message)
      })
      .catch(function (err) {
        // promise api
        test.assert.strictEqual(i, 1)
        test.assert.ifError(!err)
        test.assert.ok(err.message)
        done()
      })
    })
  })
})
