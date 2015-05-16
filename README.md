# hybridify [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Building hybrid APIs. You can use both callback and promise in same time. Like `asyncFn(name, cb).then().catch()`

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i hybridify --save
npm test
```


## API
> For more use-cases see the [tests](./test.js)

### [hybridify](./index.js#L50)
> Building hybrid APIs. You can use both callback and promise in same time.  
Like `asyncFn(name, cb).then().catch()`. As I call it _"async to hybrid"_

- `<asyncFn>` **{Function}** function to hybridify  
- `return` **{Promise}**  when funcion is called return promise

**Example:**

```js
var hybridify = require('hybridify')

var hybrid = hybridify(function asyncFn(a, b, c, callback) {
  callback(null, a, b, c)
});

// both in same time!
hybrid(1, 2, 3, function(err, res) {
  console.log('CALLBACK err:', err)
  console.log('CALLBACK res:', res)
})
.then(function(res) {
  console.log('PROMISE res:', res)
})
.catch(function(err) {
  console.log('PROMISE err:', err)
})
```

**Creating own population of hybrids**
> Every hybrid have `.hybridify` method...

```js
var run = require('exec-cmd') // some hybrid
var got = require('got') // async functions

// create got's constructor (which is .get method) hybrid
var hybridGet = run.hybridify(got)

// `promiseGet` is now hybrid that have
// promise's methods `.then` and `.catch`
// plus `.hybridify` method
var promiseGet = hybridGet('https://github.com')

// you can use either `hybridGet.hybridify`
// and `promiseGet.hybridify`
var promisePost1 = hybridGet.hybridify(got.post)
var promisePost2 = promiseGet.hybridify(got.post)
```

**Just run it**

```js
var got = require('got')
var hybridGot = hybridify(got.get)
var anotherHybrid = hybridGot('https://github.com')

console.log(typeof hybridGot.hybridify)
console.log(typeof anotherHybrid.then)
console.log(typeof anotherHybrid.catch)
console.log(typeof anotherHybrid.hybridify)
```


## Related
- [bluebird](https://github.com/petkaantonov/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [exec-cmd](https://github.com/hybridables/exec-cmd): Flexible and cross-platform executing commands. Hybrid. Async and Promise API.
- [hybridify-all](https://github.com/hybridables/hybridify-all#readme): Hybridifies all the selected functions in an object.
- [thenify](https://github.com/thenables/thenify): Promisify a callback-based function


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/hybridify/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/hybridify
[npmjs-img]: https://img.shields.io/npm/v/hybridify.svg?label=hybridify

[license-url]: https://github.com/hybridables/hybridify/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/hybridables/hybridify
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/hybridify.svg

[travis-url]: https://travis-ci.org/hybridables/hybridify
[travis-img]: https://img.shields.io/travis/hybridables/hybridify.svg

[coveralls-url]: https://coveralls.io/r/hybridables/hybridify
[coveralls-img]: https://img.shields.io/coveralls/hybridables/hybridify.svg

[david-url]: https://david-dm.org/hybridables/hybridify
[david-img]: https://img.shields.io/david/hybridables/hybridify.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
