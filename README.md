# [hybridify][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Hybridify. Hybrids. Create sync, async or generator function to support both promise and callback-style APIs in same time. Using the power of [letta][] and [relike][].

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

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
> Make sync, async and generator `fn` to support promise and callback-style APIs in same time.

**Params**

* `<fn>` **{Function}**: Some sync, async or generator function.    
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

* `<fn>` **{Function}**: Some sync, async or generator function.    
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
> Alias for [letta][]'s `.promisify` method. Almost the same as the `.hybridify` method, but can't accept callback. When returned function is called only returns a promise, not calls the final callback.

**Params**

* `<fn>` **{Function}**: Some sync, async or generator function.    
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

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/hybridify/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[letta]: https://github.com/hybridables/letta
[relike]: https://github.com/hybridables/relike

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