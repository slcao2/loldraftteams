import { combineReducers } from 'redux';

import playerList from './reducers/playerList';
import searchHistory from './reducers/searchHistory';
import searchUIValue from './reducers/searchUIValue';
import searchRequest from './reducers/searchRequest';
import teamList from './reducers/teamList';
import visibility from './reducers/visibility';

const masterReducer = combineReducers({
  playerList,
  searchHistory,
  searchUIValue,
  searchRequest,
  teamList,
  visibility,
});

export default masterReducer;
