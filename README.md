# [hybridify][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Hybridify. Hybrids. Create sync or async function to support both promise and callback-style APIs in same time. Using the power of [relike][].

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

You might also be interested in [letta][], [relike][], [relike-all][], [hybridify-all][].

## Wait, what?
Hybrids?! Yea, hybrids are just promises on steroids. The philosophy of hybrids are some edge use cases like when you want to use both promise-style api and callback-style api in same time.

Hybrids are perfect for these times of transition from old school callback hell to the new and modern, next-generation javascript world - Promises, Generators, Async Functions and Arrow functions.

If you have callback api, or even some synchronous libs, hybrids comes to the rescue - use hybridify and you are here - in Promises Land, with centralized error handling and no breaking changes.

You can use hybridify when you considered to deprecate the callback api and want to support it for next few versions. And all that, without breaking changes - users of your library or project will be able to decide what to use - promises or good old callbacks.

## Highlights
> A few features and main points.

- "promisify" synchronous and asynchronous functions
- no breaking changes between switching APIs - from callbacks to promises
- thin wrapper around [relike][] to add support for both promise and callback-style API
- only using [bluebird][], if not other Promise constructor provided through `.Promise` property
- [bluebird][] or the custom constructor is used only on environments that don't have support for native Promise
- works on any nodejs version - from `v0.10.x` to latest `v6+` [Node.js](https://nodejs.org)
- accept and works with javascript internal functions like `JSON.stringify` and `JSON.parse`

## Install
```
npm i hybridify --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const hybridify = require('hybridify')
```

### [hybridify](index.js#L41)
> Make sync or async `fn` to support promise and callback-style APIs in same time.

**Params**

* `<fn>` **{Function}**: Some sync or asynchronous function.    
* `[...args]` **{Mixed}**: Any number of any type of arguments, they are passed to `fn`.    
* `returns` **{Promise}**: Always Promise, always native Promise if supported on environment.  

**Example**

```js
const fs = require('fs')
const hybridify = require('hybridify')

const promise = hybridify(fs.readFile, 'package.json', (err, buf) => {
  if (err) console.error('callback err:', err)
  console.log('callback res:', buf) // => '<Buffer 7b 0a 20 ...>'
})

promise.then(buf => {
  console.log('promise res:', buf) // => '<Buffer 7b 0a 20 ...>'
}, err => {
  console.error('promise err:', err.stack)
})
```

### [.hybridify](index.js#L84)
> Wrapper function for `hybridify()`, but acts like `.promisify` thingy. Accepts `fn` function and returns a function, which when is called returns a Promise, but also can accept and calls final callback if given.

**Params**

* `<fn>` **{Function}**: Some sync or asynchronous function.    
* `[Promize]` **{Function}**: Promise constructor to be used on environment where no support for native.    
* `returns` **{Function}**: Hybridified function, which always return a Promise.  

**Example**

```js
const fs = require('fs')
const hybridify = require('hybridify')
const readdir = hybridify.hybridify(fs.readdir)

const promise = readdir('./', (err, files) => {
  if (err) console.error('callback err:', err)
  console.log('callback res:', files) // => array with directory files
})

promise.then(files => {
  console.log('promise res:', files) // => array of files
}, err => {
  console.error('promise err:', err.stack)
})
```

### [.promisify](index.js#L122)
> Alias for [relike][]'s `.promisify` method. Almost the same as the `.hybridify` method, but can't accept callback. When returned function is called only returns a promise, not calls the final callback.

**Params**

* `<fn>` **{Function}**: Some sync or asynchronous function.    
* `[Promize]` **{Function}**: Promise constructor to be used on environment where no support for native.    
* `returns` **{Function}**: Promisified function, which always return a Promise.  

**Example**

```js
const fs = require('fs')
const hybridify = require('hybridify')
const statPromised = hybridify.promisify(fs.statSync)

statPromised('./index.js').then(stats => {
  console.log(stats.mode) // => mode of file
}, err => {
  console.error(err.stack)
})
```

### .Promise

While `hybridify` always trying to use native Promise if available in the environment, you can
give a Promise constructor to be used on environment where there's no support - for example, old
broswers or node's 0.10 version. By default, `hybridify` will use and include [bluebird][] on old environments,
as it is the fastest implementation of Promises. So, you are able to give Promise constructor, but
it won't be used in modern environments - it always will use native Promise, you can't trick that. You
can't give custom promise implementation to be used in any environment.

**Example**

```js
const fs = require('fs')
const hybridify = require('hybridify')

hybridify.hybridify.Promise = require('q') // using `Q` promise on node 0.10
const readFile = hybridify.hybridify(fs.readFile)

readFile('package.json', 'utf8', (err, val) => {
  if (err) console.error(err)
  console.log(val)
})
.then(console.log, err => {
  console.error(err.stack)
})
```

One way to pass a custom Promise constructor is as shown above. But the other way is passing it to `.Promise` of the hybridified function, like that

```js
const fs = require('fs')
const hybridify = require('hybridify')
const statFile = hybridify.hybridify(fs.stat)

statFile.Promise = require('when') // using `when` promise on node 0.10
statFile('package.json').then(console.log, console.error)
```

One more thing, is that you can access the used Promise and can detect what promise is used. It is easy, just as `promise.Promise` and you'll get it.
Or look for `promise.___bluebirdPromise` and `promise.___customPromise` properties. `.___bluebirdPromise` (yea, with three underscores in front) will be true if environment is old and you didn't provide promise constructor to `.Promise`.  
So, when you give constructor `.__customPromise` will be true and `.___bluebirdPromise` will be false.

```js
const fs = require('fs')
const hybridify = require('hybridify')

const promise = hybridify(fs.readFile, 'package.json', 'utf8', (err, val) => {
  if (err) console.error(err)
  console.log(JSON.parse(val).name) // => 'hybridify'
})
promise.then(JSON.parse).then(val => {
  console.log(val.name) // => 'hybridify'
}, console.error)

console.log(promise.Promise) // => used Promise constructor
console.log(promise.___bluebirdPromise) // => `true` on old env, falsey otherwise
console.log(promise.___customPromise) // => `true` when pass `.Promise`, falsey otherwise
```

Or finally, you can pass Promise constructor as second argument to `.promisify`/`.hybridify` method. Like that

```js
const fs = require('fs')
const hybridify = require('hybridify')
const readFile = hybridify.hybridify(fs.readFile, require('when'))

const promise = readFile('index.js')

console.log(promise.Promise) // => The `when` promise constructor, on old environments
console.log(promise.___customPromise) // => `true` on old environments
```

## Related
* [callback2stream](https://www.npmjs.com/package/callback2stream): Transform sync, async or generator function to Stream. Correctly handle errors. [homepage](https://github.com/hybridables/callback2stream)
* [letta](https://www.npmjs.com/package/letta): Promisify sync, async or generator function, using [relike][]. Kind of promisify, but… [more](https://www.npmjs.com/package/letta) | [homepage](https://github.com/hybridables/letta)
* [limon](https://www.npmjs.com/package/limon): The pluggable JavaScript lexer. Limon = Lemon. | [homepage](https://github.com/limonjs/limon)
* [promise2stream](https://www.npmjs.com/package/promise2stream): Transform ES2015 Promise to Stream - specifically, Transform Stream using… [more](https://www.npmjs.com/package/promise2stream) | [homepage](https://github.com/hybridables/promise2stream)
* [relike-all](https://www.npmjs.com/package/relike-all): Promisify all function in an object, using [relike][]. | [homepage](https://github.com/hybridables/relike-all)
* [relike-value](https://www.npmjs.com/package/relike-value): Create promise from sync, async, string, number, array and so on. Handle… [more](https://www.npmjs.com/package/relike-value) | [homepage](https://github.com/hybridables/relike-value)
* [relike](https://www.npmjs.com/package/relike): Simple promisify async or sync function with sane defaults. Lower level than… [more](https://www.npmjs.com/package/relike) | [homepage](https://github.com/hybridables/relike)
* [value2stream](https://www.npmjs.com/package/value2stream): Transform any value to stream. Create a stream from any value -… [more](https://www.npmjs.com/package/value2stream) | [homepage](https://github.com/hybridables/value2stream)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/hybridify/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[bluebird]: https://github.com/petkaantonov/bluebird
[hybridify-all]: https://github.com/hybridables/hybridify-all
[letta]: https://github.com/hybridables/letta
[relike]: https://github.com/hybridables/relike
[relike-all]: https://github.com/hybridables/relike-all
[through2]: https://github.com/rvagg/through2

[npmjs-url]: https://www.npmjs.com/package/hybridify
[npmjs-img]: https://img.shields.io/npm/v/hybridify.svg?label=hybridify

[license-url]: https://github.com/hybridables/hybridify/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/hybridify.svg

[downloads-url]: https://www.npmjs.com/package/hybridify
[downloads-img]: https://img.shields.io/npm/dm/hybridify.svg

[codeclimate-url]: https://codeclimate.com/github/hybridables/hybridify
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/hybridify.svg

[travis-url]: https://travis-ci.org/hybridables/hybridify
[travis-img]: https://img.shields.io/travis/hybridables/hybridify/master.svg

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

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg