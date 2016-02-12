import assert from 'power-assert';

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
});
