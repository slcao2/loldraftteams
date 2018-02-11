import update from 'immutability-helper';

import { RECEIVE_SEARCH_RESPONSE, START_SEARCH_REQUEST } from '../actions/searchActions';
import { lowerCaseTrim } from '../utilities/StringUtils';

export default (state = [], action) => {
  switch (action.type) {
    case START_SEARCH_REQUEST:
      return update(state, {
        $push: [{
          isFetching: true,
          value: action.value,
          error: '',
        }],
      });
    case RECEIVE_SEARCH_RESPONSE: {
      const searchIndex = state.findIndex(request => lowerCaseTrim(request.value) === lowerCaseTrim(action.player));
      return update(state, { [searchIndex]: { isFetching: { $set: false } } });
    }
    default:
      return state;
  }
};
