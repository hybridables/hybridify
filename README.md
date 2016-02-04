# [hybridify][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Hybridify. Hybrids. Create sync/async or generator to support both promise and callback style api in same time.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


##  Why, what?

Hybrids?! Yea, hybrids are just promises on steroids. The philosophy of hybrids are some edge use cases like when you want to use both promise-style api and callback-style api in same time.  

Hybrids are perfect for these times of transition from old school callback hell to the new and modern, next-generation javascript world - Promises, Generators, Async Functions and Arrow functions.  

If you have callback api, or even some synchronous libs, hybrids comes to the rescue - use hybridify and you here - in Promises Land, with centralized error handling and no breaking changes.  

You can use hybridify when you considered to deprecate the callback api and want to support then for next few versions. And all that, without breaking changes - users of your library or project will be able to decide what to use - promises or good old callbacks.


## Install
```
npm i hybridify --save
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
const hybridify = require('hybridify')
```

### [hybridify](index.js#L38)
> Hybridify sync, async or generator function.

**Params**

* `<fn>` **{Function}**: function to hybridify, it can be sync/async/generator    
* `[Prome]` **{Function}**: custom promise constructor    
* `returns` **{Function}**  

**Example**

```js
const hybridify = require('hybridify')
const fs = require('fs')

// hybridify.promise = require('es6-promise')
const readFile = hybridify(fs.readFile)

// readFile.promise = require('es6-promise')
readFile('./package.json', 'utf8')
  .then(JSON.parse)
  .then(console.log)
```

Or you can use both promise api and callback style in same time. Also you're able to hybridify synchronous functions, like `fs.readFileSync` or even `JSON.parse` and `JSON.stringify`

```js
const hybridify = require('hybridify')
const JSONParse = hybridify(JSON.parse)

JSONParse('{"foo":"bar"}', (err, res) => {
  console.log('callback err:', err) //=> null
  console.log('callback res:', res) //=> { foo: 'bar' }
})
.then(res => console.log('promise: res', res)) //=> { foo: 'bar' }
.catch(console.error) //=> if some error
```


### [.promise](./index.js#L41)
> Passing custom promise module to be used (also required) only when enviroment don't have support for native `Promise`. For example, you can pass `q` to be used when node `0.10`.

**Example**

```js
const hybridify = require('hybridify')

// passing `q` promise module to be used
// when is node `0.10` enviroment
hybridify.promise = require('q')

const promise = hybridify(fs.readFile)('package.json', 'utf8')

promise.then(JSON.parse).then(data => {
  console.log(data.name) // => 'hybridify'
  console.log(promise.Prome) // => `q` promise constructor

  // shows that custom promise module is used
  console.log(promise.___customPromise)// => true

  // shows that Blubird promise is not used in this case
  console.log(promise.___bluebirdPromise)// => undefined
})
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/hybridify/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/hybridify
[npmjs-img]: https://img.shields.io/npm/v/hybridify.svg?label=hybridify

[license-url]: https://github.com/hybridables/hybridify/blob/master/LICENSE
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

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg