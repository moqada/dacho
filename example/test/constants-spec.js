import assert from 'power-assert';
import clearRequire from 'clear-require';

describe('constants', () => {
  let nettoActionTypes = null;
  let odenActionTypes = null;
  let degawaNettoActionTypes = null;
  beforeEach(() => {
    clearRequire('dacho');
    nettoActionTypes = require('../src/constants/nettoActionTypes').default;
    odenActionTypes = require('../src/constants/odenActionTypes').default;
    degawaNettoActionTypes = require('../src/constants/degawaNettoActionTypes').default;
  });
  it('nettoActionTypes', () => {
    assert.deepEqual(nettoActionTypes, {
      IN: 'NETTO/IN',
      OUT: 'NETTO/OUT',
      PUSH: 'NETTO/PUSH'
    });
  });

  it('nettoActionTypes', () => {
    assert.deepEqual(odenActionTypes, {
      IN: 'ODEN/IN',
      OUT: 'ODEN/OUT',
      PUSH: 'ODEN/PUSH',
      SHOWER: 'ODEN/SHOWER'
    });
  });

  it('degawaNettoActionTypes', () => {
    assert.deepEqual(degawaNettoActionTypes, {
      IN: 'DEGAWA/NETTO/IN',
      OUT: 'DEGAWA/NETTO/OUT',
      PUSH: 'DEGAWA/NETTO/PUSH'
    });
  });
});
