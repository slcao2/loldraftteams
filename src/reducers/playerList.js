import update from 'immutability-helper';

import { ADD_PLAYER } from '../actions/searchActions';
import { REMOVE_PLAYER } from '../actions/playerListActions';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return update(state, { $push: [action.player] });
    case REMOVE_PLAYER:
      return state.filter(player => player.summonerName !== action.player.summonerName);
    default:
      return state;
  }
};
