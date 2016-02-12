import Dacho from './Dacho';

/**
 * createReaction
 *
 * @param {string} [globalPrefix] prefix for every key
 * @return {Function}
 */
function createReaction(globalPrefix = '') {
  const dacho = new Dacho(globalPrefix);
  return (keys, prefix = '') => {
    return dacho.react(keys, prefix);
  };
}

export {Dacho, createReaction};
