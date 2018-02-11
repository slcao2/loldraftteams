import { RESET_SEARCH_VALUE, SET_SEARCH_VALUE } from '../actions/searchActions';

export default (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return action.value;
    case RESET_SEARCH_VALUE:
      return '';
    default:
      return state;
  }
};
