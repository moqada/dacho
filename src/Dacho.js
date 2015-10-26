/**
 * Dacho
 *
 * key/value object generator to be unique value
 */
export default class Dacho {

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
   * @param {string[]} keys foo
   * @param {string} prefix hoge
   * @return {Object}
   */
  react(keys, prefix) {
    this.validateKeys(keys);
    this.validatePrefix(prefix);

    const ret = {};
    keys.forEach(key => {
      const uniqKey = `${this.globalPrefix}${prefix}${key}`;
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
   */
  validatePrefix(prefix) {
    if (typeof prefix !== 'string') {
      throw new Error(`prefix must be string: ${prefix}`);
    }
  }

  /**
   * Validator for keys
   *
   * @param {string[]} keys keys
   * @throws {Error} throw error when keys is not array of string
   */
  validateKeys(keys) {
    if (!(keys instanceof Array)) {
      throw new Error(`keys must be Array: ${keys}`);
    }
    keys.forEach(key => {
      if (typeof key !== 'string') {
        throw new Error(`key must be string: ${key}`);
      }
    });
  }
}
