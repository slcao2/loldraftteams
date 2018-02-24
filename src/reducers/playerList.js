import update from 'immutability-helper';

import { ADD_PLAYER, START_SEARCH_REQUEST } from '../actions/searchActions';
import { REMOVE_PLAYER } from '../actions/playerListActions';
import { lowerCaseRemoveSpaces } from '../utilities/StringUtils';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      const actionPlayer = action.player;
      const playerIndex = state.findIndex(player => lowerCaseRemoveSpaces(player.summonerName) === lowerCaseRemoveSpaces(actionPlayer.summonerName));
      const newState = update(state, { [playerIndex]: { $set: { summonerName: actionPlayer.summonerName, rank: actionPlayer.rank, roles: actionPlayer.roles } } });
      return newState;
    }
    case REMOVE_PLAYER:
      return state.filter(player => player.summonerName !== action.player.summonerName);
    case START_SEARCH_REQUEST:
      return update(state, {
        $push: [{
          summonerName: action.value,
          rank: '',
          roleValues: [0, 0, 0, 0, 0],
        }],
      });
    default:
      return state;
  }
};
