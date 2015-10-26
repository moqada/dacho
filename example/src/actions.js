import nettoActionTypes from './constants/nettoActionTypes';
import odenActionTypes from './constants/odenActionTypes';
import degawaNettoActionTypes from './constants/degawaNettoActionTypes';


/**
 * Reject bathing
 *
 * @return {Object}
 */
export function rejectBathing() {
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
export function rejectEating() {
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
export function rejectBathingForDegawa() {
  return {
    type: degawaNettoActionTypes.PUSH
  };
}
