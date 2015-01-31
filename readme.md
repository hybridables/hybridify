## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> Building hybrid APIs. You can use both callback and promise in same time.  
Like `asyncFn(name, cb).then().catch()`. As I call it _"async to hybrid"_

## Install
```
npm i --save hybridify
npm test
```


From v1.0.5, `hybridify` is more awesome! Now when you hybridify some async function, it have
ability to create his own hybrids. Actualy to now every hybridified async function was just a promise
who let you use both callback-style and promise-style api in same time.

Every hybridified function will have `.hybridify` method before and after it's execution. So if
you have even one hybrid it will be able to create N more hybrids. **Without the need to include
 `hybridify` as dependency of you package, just because every hybrid will have his own population
 of hybrids.**

 Example of this awesomeness is [exec-cmd][exec-cmd] which is hybridify wrapper for 
 [async-exec-cmd][async-exec-cmd]. So now when we use `exec-cmd` in some package we'll be able to 
 create more hybrids, without including `hybridify` as dependency of that package.
 I use `exec-cmd` in [gitclone][gitclone], so i dont need to install hybridify.


## API
> For more use-cases see the [tests](./test.js)

### [hybridify](./index.js#L50)
> Building hybrid APIs. You can use both callback and promise in same time.  
Like `asyncFn(name, cb).then().catch()`. As I call it _"async to hybrid"_

- `<asyncFn>` **{Function}** function to hybridify  
- `return` **{Promise}**  when funcion is called return promise

**Example:**

```js
var hybridify = require('hybridify');

var hybrid = hybridify(function asyncFn(a, b, c, callback) {
  callback(null, a, b, c);
});

// both in same time!
hybrid(1, 2, 3, function(err, res) {
  console.log('CALLBACK err:', err);
  console.log('CALLBACK res:', res);
})
.then(function(res) {
  console.log('PROMISE res:', res);
})
.catch(function(err) {
  console.log('PROMISE err:', err);
})
```

**Creating own population of hybrids**
> Every hybrid have `.hybridify` method...

```js
var run = require('exec-cmd'); // some hybrid
var got = require('got'); // async functions

// create got's constructor (which is .get method) hybrid
var hybridGet = run.hybridify(got);

// `promiseGet` is now hybrid that have
// promise's methods `.then` and `.catch`
// plus `.hybridify` method
var promiseGet = hybridGet('https://github.com');

// you can use either `hybridGet.hybridify`
// and `promiseGet.hybridify`
var promisePost1 = hybridGet.hybridify(got.post);
var promisePost2 = promiseGet.hybridify(got.post);
```

**Just run it**

```js
var got = require('got');
var hybridGot = hybridify(got.get);
var anotherHybrid = hybridGot('https://github.com');

console.log(typeof hybridGot.hybridify);
console.log(typeof anotherHybrid.then);
console.log(typeof anotherHybrid.catch);
console.log(typeof anotherHybrid.hybridify);
```

## Related
- [callback-and-promise][callback-and-promise]
- [thenify-all][thenify-all]
- [thenify][thenify]
- [thenables][thenables]
- [hybridables][hybridables]
- [hybridify][hybridify]
- [hybridify-all][hybridify-all]
- [handle-callback][handle-callback]
- [handle-errors][handle-errors]
- [handle-arguments][handle-arguments]
- [async-exec-cmd][async-exec-cmd]
- [exec-cmd][exec-cmd] (hybrid)
- [gitclone][gitclone] (hybrid)
- [gitclone-cli][gitclone-cli] (hybrid)


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/hybridify
[npmjs-img]: https://img.shields.io/npm/v/hybridify.svg?style=flat&label=hybridify

[coveralls-url]: https://coveralls.io/r/hybridables/hybridify?branch=master
[coveralls-img]: https://img.shields.io/coveralls/hybridables/hybridify.svg?style=flat

[license-url]: https://github.com/hybridables/hybridify/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/hybridables/hybridify
[travis-img]: https://img.shields.io/travis/hybridables/hybridify.svg?style=flat

[daviddm-url]: https://david-dm.org/hybridables/hybridify
[daviddm-img]: https://img.shields.io/david/hybridables/hybridify.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/hybridables/hybridify/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), January 31, 2015_

[callback-and-promise]: https://github.com/thenables/callback-and-promise
[thenify-all]: https://github.com/thenables/thenify-all
[thenify]: https://github.com/thenables/thenify
[thenables]: https://github.com/thenables
[hybridables]: https://github.com/hybridables
[hybridify]: https://github.com/hybridables/hybridify
[hybridify-all]: https://github.com/hybridables/hybridify-all
[handle-callback]: https://github.com/hybridables/handle-callback
[handle-errors]: https://github.com/hybridables/handle-errors
[handle-arguments]: https://github.com/hybridables/handle-arguments
[exec-cmd]: https://github.com/hybridables/exec-cmd
[async-exec-cmd]: https://github.com/tunnckoCore/async-exec-cmd
[gitclone]: https://github.com/tunnckoCore/gitclone
[gitclone-cli]: https://github.com/tunnckoCore/gitclone-cli