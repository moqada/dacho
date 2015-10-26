import assert from 'power-assert';
import nettoActionTypes from '../src/constants/nettoActionTypes';
import odenActionTypes from '../src/constants/odenActionTypes';
import degawaNettoActionTypes from '../src/constants/degawaNettoActionTypes';

describe('constants', () => {
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
