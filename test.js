/**
 * hybridify <https://github.com/tunnckoCore/hybridify>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var hybridify = require('./index');

var handleCallback = require('./index');
var assert = require('assert');
var got = require('got');

var hybridGot = hybridify(got.get);

// almost the same tests as `handle-callback`,
// which is expected, because its the core of `hybridify`

describe('hybridify:', function() {
  describe('should throw error', function() {
    it('when first argument not a Function', function(done) {
      function fixture() {
        return hybridify('expects only function');
      }
      assert.throws(fixture, TypeError);
      done();
    });
  });

  describe('should work', function() {
    it('with callback api', function(done) {
      this.timeout(10000);

      var hybrid = hybridGot('https://github.com', function(err, res) {
        var body = res[0];
        var stream = res[1];
        // callback api

        assert.strictEqual(err, null);
        assert(res);
        assert(stream);
        assert.strictEqual(body[0], '<'); // it is html
        done();
      })
    });

    it('with promise api', function(done) {
      this.timeout(10000);

      var hybrid = hybridGot('https://github.com');
      hybrid.then(function(res) {
        var body = res[0];
        var stream = res[1];
        // promise api

        assert(res);
        assert(stream);
        assert.strictEqual(body[0], '<'); // it is html
        done();
      });
    });

    it('with both callback and promise api', function(done) {
      this.timeout(10000);

      var hybrid = hybridGot('https://github.com', function(err, res) {
        var body = res[0];
        var stream = res[1];
        // callback api

        assert.strictEqual(err, null);
        assert(res);
        assert(stream);
        assert.strictEqual(body[0], '<'); // it is html
      })
      .then(function(res) {
        var body = res[0];
        var stream = res[1];
        // promise api

        assert(res);
        assert(stream);
        assert.strictEqual(body[0], '<'); // it is html
        done();
      });
    });
  });

  describe('should be able to create own hybrids', function() {
    it('every hybrid have `.hybridify` method', function(done) {
      var hybrid = hybridGot('https://github.com');

      assert.strictEqual(typeof hybrid.hybridify, 'function');
      assert.strictEqual(typeof hybridGot.hybridify, 'function');
      done();
    });
    it('every hybrid is promise and have `.then` and `.catch` methods', function(done) {
      var hybrid = hybridGot('https://github.com');

      assert.strictEqual(typeof hybrid.then, 'function');
      assert.strictEqual(typeof hybrid.catch, 'function');
      assert.strictEqual(typeof hybrid.hybridify, 'function');
      assert.strictEqual(typeof hybridGot.hybridify, 'function');
      done();
    });
  });

  describe('should be able to catch error', function() {
    it('with callback api', function(done) {
      this.timeout(10000);

      var hybrid = hybridGot('https://gitfsdfsdfm', function(err, res) {
        // callback api
        assert.throws(err, Error);
        assert.strictEqual(res, null || undefined);
        done();
      })
    });

    it('with promise api - with .catch(err)', function(done) {
      this.timeout(10000);

      var hybrid = hybridGot('https://gitfsdfsdfm')
      hybrid.catch(function(err) {
        // promise api
        assert.throws(err, Error);
        done();
      })
    });

    it('with both callback and promise api', function(done) {
      this.timeout(10000);

      var hybrid = hybridGot('https://gitfsdfsdfm', function(err) {
        // callback api
        assert.throws(err, Error);
      })
      .catch(function(err) {
        // promise api
        assert.throws(err, Error);
        done();
      })
    });
  });
});
