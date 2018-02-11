import update from 'immutability-helper';

import { GET_TEAMS } from '../actions/teamListActions';

export default (state = {
  teamOne: [],
  teamTwo: [],
}, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return update(state, { $set: action.team });
    default:
      return state;
  }
};
