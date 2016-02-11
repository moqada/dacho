import assert from 'power-assert';

describe('dacho', () => {
  /** @test {createReaction} */
  describe('createReaction', () => {
    let createReaction = null;
    beforeEach(() => {
      createReaction = require('../src').createReaction;
    });

    it('can create reaction', () => {
      const reaction = createReaction();
      const types = reaction(['LOGIN'], 'FOO_');
      assert.deepEqual(types, {
        LOGIN: 'FOO_LOGIN'
      });
    });

    it('can create reaction with globalPrefix', () => {
      const reaction = createReaction('DACHO/');
      const types = reaction(['LOGIN'], 'FOO_');
      assert.deepEqual(types, {
        LOGIN: 'DACHO/FOO_LOGIN'
      });
    });
  });
});
