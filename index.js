/**
 * hybridify <https://github.com/tunnckoCore/hybridify>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var thenify = require('thenify-all');

module.exports = function hybridify(promise, obj, methods, callback) {
  obj = obj || {}
  methods = methods || [];

  if (typeof obj === 'function') {
    callback = obj
    obj = {};
  }

  if (typeof methods === 'function') {
    callback = methods
    methods = []
  }

  if (!isPromise(promise)) {
    promise = thenify(promise, obj, methods);
  }

  return handleCallback(promise, callback)
};

function handleCallback(promise, callback) {
  return callback ? function() {
    var len = arguments.length
    var args = new Array(len);
    for (var i = 0; i < len; ++i) {
      args[i] = arguments[i]
    }

    promise = promise.apply(promise, args);
    promise.then(function responseFulfilled(res) {
      callback(null, res);
    })
    promise.catch(function responseRejected(err) {
      callback(err);
    });

    return promise;
  } : promise;
}

function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}













































    // var len = arguments.length
    // var args = new Array(len);
    // for (var i = 0; i < len; ++i) {
    //   args[i] = arguments[i]
    // }

    // promise.apply(promise, args).then(function responseFulfilled(res) {
    //   console.log(res);
    //   callback && callback(null, res);
    // })
    // promise.apply(promise, args).catch(function responseRejected(err) {
    //   callback && callback(err);
    // });


    //return promise;
