import assert from 'power-assert';
import clearRequire from 'clear-require';

describe('dacho/reaction', () => {
  describe('reaction', () => {
    let reaction = null;
    beforeEach(() => {
      clearRequire('../src/reaction');
      reaction = require('../src/reaction', {}).default;
    });

    it('can generate types', () => {
      const types = reaction(['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR'], 'FOO_');
      assert.deepEqual(types, {
        LOGIN: 'FOO_LOGIN',
        LOGIN_SUCCESS: 'FOO_LOGIN_SUCCESS',
        LOGIN_ERROR: 'FOO_LOGIN_ERROR'
      });
    });

    it('can generate types without prefix', () => {
      const types = reaction(['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR']);
      assert.deepEqual(types, {
        LOGIN: 'LOGIN',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGIN_ERROR: 'LOGIN_ERROR'
      });
    });

    it('can generate types when prefix is different', () => {
      const types1 = reaction(['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR'], 'FOO_');
      const types2 = reaction(['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR'], 'BAR_');
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

    it('throws Error when value is already registered', () => {
      reaction(['FOO', 'BAR'], 'FOO_');
      try {
        reaction(['FOO'], 'FOO_');
      } catch (e) {
        assert(e.message === 'key is already registered: FOO -> FOO_FOO');
        return;
      }
      throw Error('does not throws error');
    });

    describe('throws Error when prefix is not string', () => {
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

    describe('throws Error when keys is not array', () => {
      const cases = [
        ['null', null, 'null'],
        ['number', 1, '1'],
        ['object', {foo: 'foo'}, '[object Object]']
      ];
      cases.forEach(([type, keys, expected]) => {
        it(`: ${type}`, () => {
          try {
            reaction(keys);
          } catch (e) {
            assert(e.message === `keys must be Array: ${expected}`);
            return;
          }
          throw Error('does not throws error');
        });
      });
    });

    describe('throws Error when keys is not array of string', () => {
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
