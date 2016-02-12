/* @flow */
import nettoActionTypes from './constants/nettoActionTypes';
import odenActionTypes from './constants/odenActionTypes';
import degawaNettoActionTypes from './constants/degawaNettoActionTypes';

/**
 * Reject bathing
 *
 * @return {Object}
 */
export function rejectBathing(): Object {
  return {
    type: nettoActionTypes.PUSH,
    payload: {member: 'UESHIMA'}
  };
}


/**
 * Reject eating oden
 *
 * @return {Object}
 */
export function rejectEating(): Object {
  return {
    type: odenActionTypes.PUSH,
    payload: {member: 'UESHIMA'}
  };
}


/**
 * Reject bathing - degawa -
 *
 * @return {Object}
 */
export function rejectBathingForDegawa(): Object {
  return {
    type: degawaNettoActionTypes.PUSH
  };
}
