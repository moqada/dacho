/**
 * Dacho
 *
 * key/value object generator to be unique value
 */
export default class Dacho {  // eslint-disable-line require-jsdoc

  /**
   * Constructor
   *
   * @param {string} globalPrefix prefix for every key
   */
  constructor(globalPrefix) {
    this.validatePrefix(globalPrefix);

    /**
     * @type {string}
     */
    this.globalPrefix = globalPrefix;

    /**
     * @type {string[]}
     */
    this.registered = [];
  }

  /**
   * react
   *
   * @param {Object|string[]} keys keys
   * @param {string} prefix prefix for value
   * @return {Object}
   */
  react(keys, prefix) {
    const keys_ = this.validateKeys(keys);
    const prefix_ = this.validatePrefix(prefix);

    const ret = {};
    keys_.forEach(key => {
      const uniqKey = `${this.globalPrefix}${prefix_}${key}`;
      if (this.registered.indexOf(uniqKey) >= 0) {
        throw new Error(`key is already registered: ${key} -> ${uniqKey}`);
      }
      this.registered.push(uniqKey);
      ret[key] = uniqKey;
    });
    return ret;
  }

  /**
   * Validator for prefix
   *
   * @param {string} prefix prefix
   * @throws {Error} throw error when prefix is not string
   * @return {string}
   */
  validatePrefix(prefix) {
    if (typeof prefix !== 'string') {
      throw new Error(`prefix must be string: ${prefix}`);
    }
    return prefix;
  }

  /**
   * Validator for keys
   *
   * @param {Object|string[]} keys keys
   * @throws {Error} throw error when keys is not array of string
   * @return {string[]}
   */
  validateKeys(keys) {
    let keys_ = keys;
    if (keys_ instanceof Object) {
      if (!(keys_ instanceof Array)) {
        keys_ = Object.keys(keys_);
      }
    } else {
      throw new Error(`keys must be Array or Object: ${keys_}`);
    }
    keys_.forEach(key => {
      if (typeof key !== 'string') {
        throw new Error(`key must be string: ${key}`);
      }
    });
    return keys_;
  }
}
