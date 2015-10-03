/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var hybridify = require('./index')
var isPromise = require('is-promise')
var isHybrid = require('is-hybrid')

var got = require('got')
var hybridGot = hybridify(got.get)

test('hybridify:', function () {
  test('should hybridify sync function', function (done) {
    var jsonParseHybrid = hybridify(JSON.parse)
    var marker = 11

    jsonParseHybrid('{"foo":"bar"}', function (err, res) {
      test.ifError(err)
      test.deepEqual(res, {foo: 'bar'})
      marker += 21
    })
      .then(function (res) {
        test.deepEqual(res, {foo: 'bar'})
        test.equal(marker, 32)
        done()
      })
  })
  test('should hybridify(JSON.parse) have .hybridify method', function (done) {
    var jsonParseHybrid = hybridify(JSON.parse)

    test.equal(typeof jsonParseHybrid.hybridify, 'function')
    done()
  })
  test('should hybrid be promise, return true on isPromise(hybrid)', function (done) {
    var jsonParseHybrid = hybridify(JSON.parse)
    var hybrid = jsonParseHybrid('{"foo":"bar"}')

    test.equal(isPromise(hybrid), true)
    done()
  })
  test('should return true on isHybrid(hybrid)', function (done) {
    var jsonParseHybrid = hybridify(JSON.parse)
    var hybrid = jsonParseHybrid('{"foo":"bar"}')

    test.equal(isHybrid(hybrid), true)
    done()
  })
  test('should hybrid promise have .hybridify method', function (done) {
    var jsonParseHybrid = hybridify(JSON.parse)
    var promise = jsonParseHybrid('{"foo":"bar"}')

    test.equal(typeof promise.hybridify, 'function')
    done()
  })
  test('should work with callback api', function (done) {
    hybridGot('https://github.com', function (err, res) {
      test.ifError(err)
      test.equal(res.length, 2)
      test.equal(res[0][0], '<')
      done()
    })
  })
  test('should work with promise api', function (done) {
    hybridGot('https://github.com').then(function (res) {
      test.equal(res.length, 2)
      test.equal(res[0][0], '<')
      done()
    })
  })
  test('should work with both callback and promise api', function (done) {
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
  test('should work with fs.readFileSync directly', function (done) {
    var fn = hybridify(fs.readFileSync)
    var cnt = 0

    var promise = fn('package.json', function (err, res) {
      test.ifError(err)
      // test.ok(res.indexOf('"license": "MIT"') !== -1)
      test.ok(res instanceof Buffer)
      cnt++
    })

    promise
      .then(function (res) {
        // test.ok(res.indexOf('"license": "MIT"') !== -1)
        test.ok(res instanceof Buffer)
        test.equal(cnt, 1)
        done()
      })
      .catch(done)
  })
  test('should work with mzfs.readFile directly', function (done) {
    var mzfs = require('mz/fs')
    var fn = hybridify(mzfs.readFile)
    var cnt = 0

    var promise = fn('package.json', function (err, res) {
      test.ifError(err)
      // test.ok(res.indexOf('"license": "MIT"') !== -1)
      test.ok(res instanceof Buffer)
      cnt++
    })

    promise
      .then(function (res) {
        // test.ok(res.indexOf('"license": "MIT"') !== -1)
        test.ok(res instanceof Buffer)
        test.equal(cnt, 1)
        done()
      })
      .catch(done)
  })
  test('should work with mzfs.readFileSync directly', function (done) {
    var mzfs = require('mz/fs')
    var fn = hybridify(mzfs.readFileSync)
    var cnt = 0

    var promise = fn('package.json', function (err, res) {
      test.ifError(err)
      // test.ok(res.indexOf('"license": "MIT"') !== -1)
      test.ok(res instanceof Buffer)
      cnt++
    })

    promise
      .then(function (res) {
        // test.ok(res.indexOf('"license": "MIT"') !== -1)
        test.ok(res instanceof Buffer)
        test.equal(cnt, 1)
        done()
      })
      .catch(done)
  })
  test('should work with JSON.parse directly', function (done) {
    var fn = hybridify(JSON.parse)
    var cnt = 0

    var promise = fn('{"foo":"bar"}', function (err, res) {
      test.ifError(err)
      test.deepEqual(res, {foo: 'bar'})
      cnt++
    })

    promise
      .then(function (res) {
        test.deepEqual(res, {foo: 'bar'})
        test.equal(cnt, 1)
        done()
      })
      .catch(done)
  })
})
