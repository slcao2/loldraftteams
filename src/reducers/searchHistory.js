import update from 'immutability-helper';

import { ADD_SEARCH_HISTORY, REMOVE_SEARCH_HISTORY } from '../actions/searchActions';

const cookies = document.cookie;
const cookiesObject = {};
cookies.split(';').forEach((cookie) => {
  const [key, value] = cookie.trim().split('=');
  cookiesObject[key] = value;
});
let searchHistoryCookie = [];
if (cookiesObject.searchHistory) {
  searchHistoryCookie = cookiesObject.searchHistory.split(',');
}

export default (state = searchHistoryCookie, action) => {
  switch (action.type) {
    case ADD_SEARCH_HISTORY:
      if (state.indexOf(action.name) === -1) {
        const newList = update(state, { $unshift: [action.name] });
        while (newList.length > 10) {
          newList.pop();
        }
        document.cookie = `searchHistory=${newList.join(',')}`;
        return newList;
      }
      return state;
    case REMOVE_SEARCH_HISTORY: {
      const itemIndex = state.indexOf(action.name);
      let newList = state;
      if (itemIndex > -1) {
        newList = update(state, { $splice: [[itemIndex, 1]] });
      }
      document.cookie = `searchHistory=${newList.join(',')}`;
      return newList;
    }
    default:
      return state;
  }
};
