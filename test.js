/*!
 * hybridify <https://github.com/hybridables/hybridify>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var hybridify = require('./index')

test('should works', function (done) {
  var readFile = hybridify(fs.readFile)
  var promise = readFile('package.json')
  promise.then(JSON.parse).then(function (data) {
    test.strictEqual(data.name, 'hybridify')
    done()
  }, done)
})
