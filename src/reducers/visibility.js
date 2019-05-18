import update from 'immutability-helper';
import { ADD_BANNER, REMOVE_BANNER } from '../actions/bannerActions';
import { SET_HISTORY_VISIBLITY } from '../actions/searchActions';

export default (state = {
  banners: [],
  isHistoryVisible: false,
}, action) => {
  switch (action.type) {
    case ADD_BANNER:
      return update(state, {
        banners: {
          $push: [{
            id: action.id,
            message: action.message,
          }],
        },
      });
    case REMOVE_BANNER:
      return update(state, {
        banners: {
          $set: state.banners.filter(banner => banner.id !== action.id),
        },
      });
    case SET_HISTORY_VISIBLITY:
      return update(state, { isHistoryVisible: { $set: action.isVisible } });
    default:
      return state;
  }
};
