import Dacho from './Dacho';

/**
 * @typedef {Function} Reaction
 * @param {string[]|Object} keys object keys
 * @param {string} [prefix=''] prefix of value (Optional)
 * @return {Object}
 * @example
 * reaction({ACTION1: null, ACTION2: null}, 'FOO/');
 * // {ACTION1: 'FOO/ACTION1', ACTION2: 'FOO/ACTION2'};
 *
 * reaction(['ACTION1', 'ACTION2'], 'BAR/');
 * // {ACTION1: 'BAR/ACTION1', ACTION2: 'BAR/ACTION2'};
 */

/**
 * createReaction
 *
 * @param {string} [globalPrefix=''] prefix for every key
 * @return {Reaction}
 */
function createReaction(globalPrefix = '') {
  const dacho = new Dacho(globalPrefix);
  return (keys, prefix = '') => {
    return dacho.react(keys, prefix);
  };
}

/**
 * reaction
 *
 * @type {Reaction}
 */
const reaction = createReaction();

export {Dacho, createReaction, reaction};
