import PlayerInformationService from '../services/PlayerInformationService';
import { removePlayer } from './playerListActions';

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const RESET_SEARCH_VALUE = 'RESET_SEARCH_VALUE';
export const SET_SEARCH_ENABLED = 'SET_SEARCH_ENABLED';
export const SET_SEARCH_DISABLED = 'SET_SEARCH_DISABLED';
export const START_SEARCH_REQUEST = 'START_SEARCH_REQUEST';
export const RECEIVE_SEARCH_RESPONSE = 'RECEIVE_SEARCH_RESPONSE';
export const ADD_PLAYER = 'ADD_PLAYER';

export function setSearchValue(value) {
  return { type: SET_SEARCH_VALUE, value };
}

export function resetSearchValue() {
  return { type: RESET_SEARCH_VALUE };
}

export function setSearchEnabled() {
  return { type: SET_SEARCH_ENABLED };
}

export function setSearchDisabled() {
  return { type: SET_SEARCH_DISABLED };
}

export function startSearchRequest(value) {
  return { type: START_SEARCH_REQUEST, value };
}

export function receiveSearchResponse(player) {
  return { type: RECEIVE_SEARCH_RESPONSE, player };
}

export function addPlayer(player) {
  return { type: ADD_PLAYER, player };
}

export function requestSearchPlayer(searchValue) {
  return function (dispatch) {
    dispatch(startSearchRequest(searchValue));
    return PlayerInformationService.getPlayerData(searchValue).then(
      (response) => {
        dispatch(receiveSearchResponse(response.summonerName));
        dispatch(addPlayer(response));
      },
      (error) => {
        dispatch(receiveSearchResponse(searchValue));
        dispatch(removePlayer({ summonerName: searchValue }));
      },
    );
  };
}
