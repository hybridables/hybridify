# hybridify [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Create synchronous or asynchronous functions to support both promise and callback style api. They are now hybrids - they are able to have own population of hybrids without including `hybridify` anymore.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

Hybrids?! Yea, hybrids are just promises on steroids. The philosophy of hybrids are some edge use cases like when you want to use both promise-style api and callback-style api in same time.

Hybrids are perfect for these times of transition from old school callback hell to the new and modern, next-generation javascript world - Promises, Generators, Async Functions and Arrow functions.

If you have callback api, or even some synchronous libs, hybrids comes to the rescue - use hybridify and you here - in Promises Land, with centralized error handling and no breaking changes.

You can use hybridify when you considered to derecate the callback api and want to support then for next few versions. And all that, without breaking changes - users of your library or project will be able to decide what to use - promises or good old callbacks.


## Install
```
npm i hybridify --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

- `<fn>` **{Function}** function to hybridify, it can be sync or async
- `return` **{Promise}**  when funcion is called return promise

**Example:**

```js
var fs = require('fs')
var hybridify = require('hybridify')
var readFile = hybridify(fs.readFile)

readFile('./package.json', 'utf8')
.then(console.log) //=> content of package.json
.catch(console.error) //=> if some error
```

Or you can use both promise api and callback style in same time. Also you're able to hybridify synchronous functions, like `fs.readFileSync` or even `JSON.parse` and `JSON.stringify`

```js
var hybridify = require('hybridify')
var JSONParse = hybridify(JSON.parse)

JSONParse('{"foo":"bar"}', function (err, res) {
  console.log('callback err:', err) //=> null
  console.log('callback res:', res) //=> { foo: 'bar' }
})
.then(console.log) //=> { foo: 'bar' }
.catch(console.error) //=> if some error
```


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
