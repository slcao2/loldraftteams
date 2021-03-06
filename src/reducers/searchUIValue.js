import update from 'immutability-helper';

import { RESET_SEARCH_VALUE, SET_SEARCH_VALUE, SET_SEARCH_ENABLED, SET_SEARCH_DISABLED, SET_REGION } from '../actions/searchActions';

export default (state = {
  value: '',
  enabled: true,
  region: 'NA',
}, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return update(state, { value: { $set: action.value } });
    case RESET_SEARCH_VALUE:
      return update(state, { value: { $set: '' } });
    case SET_SEARCH_ENABLED:
      return update(state, { enabled: { $set: true } });
    case SET_SEARCH_DISABLED:
      return update(state, { enabled: { $set: false } });
    case SET_REGION:
      return update(state, { region: { $set: action.region } });
    default:
      return state;
  }
};
