## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> Building hybrid APIs. You can use both callback and promise in same time.  
Like `asyncFn(name, cb).then().catch()`

## Install
```bash
npm install hybridify
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

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


## Related
- [thenify](https://github.com/thenables/thenify)
- [thenify-all](https://github.com/thenables/thenify-all)
- [callback-and-promise](https://github.com/thenables/callback-and-promise)
- [thenables org](https://github.com/thenables)


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

[coveralls-url]: https://coveralls.io/r/tunnckoCore/hybridify?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/hybridify.svg?style=flat

[license-url]: https://github.com/tunnckoCore/hybridify/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/hybridify
[travis-img]: https://img.shields.io/travis/tunnckoCore/hybridify.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/hybridify
[daviddm-img]: https://img.shields.io/david/tunnckoCore/hybridify.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/hybridify/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), January 17, 2015_