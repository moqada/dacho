# dacho

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download-image]][npm-download-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

Utility of generating key/value object with a prefixed value.

For example, it is convenient to define ActionTypes for Flux, Redux and the like.
Besides, it prevent from defining same value. It throws Error if you registered already defined value.

> dacho is named after [Dacho Club](https://ja.wikipedia.org/wiki/%E3%83%80%E3%83%81%E3%83%A7%E3%82%A6%E5%80%B6%E6%A5%BD%E9%83%A8) that is Japanese comedy group.
> They perform patterned reaction by the simple rules every time, but it is unique...


## Installation

```
npm install --save dacho
```


## Usage

### Basic

It generate key/value object with a prefixed value.

```javascript
// constants/nettoActionTypes.js
import {reaction} from 'dacho';

export default reaction([
  'IN',
  'OUT',
  'PUSH'
], 'NETTO/')

// OR using Object.
//
// export default reaction({
//   IN: null,
//   OUT: null,
//   PUSH: null
// }, 'NETTO/');
```

```javascript
// constants/odenActionTypes.js
import {reaction} from 'dacho';

export default reaction([
  'IN',
  'OUT',
  'PUSH',
  'SHOWER',
], 'ODEN/')

// OR using Object.
//
// export default reaction({
//   IN: null,
//   OUT: null,
//   PUSH: null
//   SHOWER: null
// }, 'ODEN/');
```

```javascript
// actionCreator.js
import nettoActionTypes from './constants/nettoActionTypes';
import odenActionTypes from './constants/odenActionTypes';


function rejectBathing() {
  return {
    type: nettoActionTypes.PUSH,  // 'NETTO/PUSH'
    payload: {member: 'UESHIMA'}
  };
}

function rejectEating() {
  return {
    type: odenActionTypes.PUSH,  // 'ODEN/PUSH'
    payload: {member: 'UESHIMA'}
  };
}

// assert.deepEqual(nettoActionTypes, {
//   IN: 'NETTO/IN',
//   OUT: 'NETTO/OUT',
//   PUSH: 'NETTO/PUSH'
// });

// assert.deepEqual(odenActionTypes, {
//   IN: 'ODEN/IN',
//   OUT: 'ODEN/OUT',
//   PUSH: 'ODEN/PUSH'
//   SHOWER: 'ODEN/SHOWER'
// });
```

It throws Error when you create same value object.

```javascript
// ./constants/nettoActionTypes2.js
import {reaction} from 'dacho';

export default reaction([
  'IN'
], 'NETTO/');

// -> throw Error because 'NETTO/IN' is already defined.
```

### With Global Prefix

It generate object with global prefix.

```javascript
// ./singletons/reaction.js
import {createReaction} from 'dacho';

export default createReaction('DEGAWA/')
```

```javascript
// ./constants/degawaNettoActionTypes.js
import reaction from './singletons/reaction';

export default reaction([
  'IN',
  'OUT',
  'PUSH'
], 'NETTO/');

// import degawaNettoActionTypes from './constants/degawaNettoActionTypes';
//
// assert.deepEqual(degawaNettoActionTypes, {
//   IN: 'DEGAWA/NETTO/IN',
//   OUT: 'DEGAWA/NETTO/OUT',
//   PUSH: 'DEGAWA/NETTO/PUSH'
// });
```

## Tips

### Testing

Despite collect values, It may raise Errors (`key is already registered`) when executing unit tests.
One of solution of this problem is to use [clear-require](https://github.com/sindresorhus/clear-require).

Example is [here](https://github.com/moqada/dacho/blob/master/test/reaction-spec.js).

### Flow

`dacho` can use together with Flow annotation.
But, Flow version is 0.19 or higher.


[npm-url]: https://www.npmjs.com/package/dacho
[npm-image]: https://img.shields.io/npm/v/dacho.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/dacho
[npm-download-image]: https://img.shields.io/npm/dt/dacho.svg?style=flat-square
[travis-url]: https://travis-ci.org/moqada/dacho
[travis-image]: https://img.shields.io/travis/moqada/dacho.svg?style=flat-square
[daviddm-url]: https://david-dm.org/moqada/dacho
[daviddm-image]: https://img.shields.io/david/moqada/dacho.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/dacho#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/dacho.svg?style=flat-square
[codecov-url]: https://codecov.io/github/moqada/dacho
[codecov-image]: https://img.shields.io/codecov/c/github/moqada/dacho.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/dacho.svg?style=flat-square
