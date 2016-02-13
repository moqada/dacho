import assert from 'power-assert';
import clearRequire from 'clear-require';

describe('dacho', () => {
  /** @test {createReaction} */
  describe('createReaction', () => {
    let createReaction = null;
    beforeEach(() => {
      createReaction = require('../src').createReaction;
    });

    context('can create reaction', () => {
      const cases = [
        {name: 'array', args: ['LOGIN']},
        {name: 'object', args: {LOGIN: null}}
      ];
      cases.forEach(({name, args}) => {
        it(name, () => {
          const reaction = createReaction();
          const types = reaction(args, 'FOO_');
          assert.deepEqual(types, {
            LOGIN: 'FOO_LOGIN'
          });
        });
      });
    });

    context('can create reaction with globalPrefix', () => {
      const cases = [
        {name: 'array', args: ['LOGIN']},
        {name: 'object', args: {LOGIN: null}}
      ];
      cases.forEach(({name, args}) => {
        it(name, () => {
          const reaction = createReaction('DACHO/');
          const types = reaction(args, 'FOO_');
          assert.deepEqual(types, {
            LOGIN: 'DACHO/FOO_LOGIN'
          });
        });
      });
    });
  });

  describe('reaction', () => {
    let reaction = null;
    beforeEach(() => {
      clearRequire('../src');
      reaction = require('../src').reaction;
    });

    context('can generate types', () => {
      const cases = [
        {name: 'array', args: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR']},
        {name: 'object', args: {
          LOGIN: null,
          LOGIN_SUCCESS: null,
          LOGIN_ERROR: null
        }}
      ];
      cases.forEach(({name, args}) => {
        it(name, () => {
          const types = reaction(args, 'FOO_');
          assert.deepEqual(types, {
            LOGIN: 'FOO_LOGIN',
            LOGIN_SUCCESS: 'FOO_LOGIN_SUCCESS',
            LOGIN_ERROR: 'FOO_LOGIN_ERROR'
          });
        });
      });
    });

    context('can generate types without prefix', () => {
      const cases = [
        {name: 'array', args: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR']},
        {name: 'object', args: {
          LOGIN: null,
          LOGIN_SUCCESS: null,
          LOGIN_ERROR: null
        }}
      ];
      cases.forEach(({name, args}) => {
        it(name, () => {
          const types = reaction(args);
          assert.deepEqual(types, {
            LOGIN: 'LOGIN',
            LOGIN_SUCCESS: 'LOGIN_SUCCESS',
            LOGIN_ERROR: 'LOGIN_ERROR'
          });
        });
      });
    });

    context('can generate types when prefix is different', () => {
      const cases = [
        {name: 'array', args: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR']},
        {name: 'object', args: {
          LOGIN: null,
          LOGIN_SUCCESS: null,
          LOGIN_ERROR: null
        }}
      ];
      cases.forEach(({name, args}) => {
        it(name, () => {
          const types1 = reaction(args, 'FOO_');
          const types2 = reaction(args, 'BAR_');
          assert.deepEqual(types1, {
            LOGIN: 'FOO_LOGIN',
            LOGIN_SUCCESS: 'FOO_LOGIN_SUCCESS',
            LOGIN_ERROR: 'FOO_LOGIN_ERROR'
          });
          assert.deepEqual(types2, {
            LOGIN: 'BAR_LOGIN',
            LOGIN_SUCCESS: 'BAR_LOGIN_SUCCESS',
            LOGIN_ERROR: 'BAR_LOGIN_ERROR'
          });
        });
      });
    });

    context('throws Error when value is already registered', () => {
      const cases = [
        {name: 'array', args: ['FOO', 'BAR']},
        {name: 'object', args: {FOO: null, BAR: null}}
      ];
      cases.forEach(({name, args}) => {
        it(name, () => {
          reaction(args, 'FOO_');
          try {
            reaction(['FOO'], 'FOO_');
          } catch (e) {
            assert(e.message === 'key is already registered: FOO -> FOO_FOO');
            return;
          }
          throw Error('does not throws error');
        });
      });
    });

    context('throws Error when prefix is not string', () => {
      const cases = [
        ['null', null, 'null'],
        ['number', 1, '1'],
        ['object', {foo: 'foo'}, '[object Object]']
      ];
      cases.forEach(([type, prefix, expected]) => {
        it(`: ${type}`, () => {
          try {
            reaction(['FOO', 'BAR'], prefix);
          } catch (e) {
            assert(e.message === `prefix must be string: ${expected}`);
            return;
          }
          throw Error('does not throws error');
        });
      });
    });

    context('throws Error when keys is not array or object', () => {
      const cases = [
        ['null', null, 'null'],
        ['number', 1, '1']
      ];
      cases.forEach(([type, keys, expected]) => {
        it(`: ${type}`, () => {
          try {
            reaction(keys);
          } catch (e) {
            assert(e.message === `keys must be Array or Object: ${expected}`);
            return;
          }
          throw Error('does not throws error');
        });
      });
    });

    context('throws Error when keys is not array of string', () => {
      const cases = [
        ['null', [null], 'null'],
        ['number', [1], '1'],
        ['object', [{foo: 'foo'}], '[object Object]']
      ];
      cases.forEach(([type, keys, expected]) => {
        it(`: ${type}`, () => {
          try {
            reaction(keys);
          } catch (e) {
            assert(e.message === `key must be string: ${expected}`);
            return;
          }
          throw Error('does not throws error');
        });
      });
    });
  });
});
