import update from 'immutability-helper';

import { ADD_BANNER, REMOVE_BANNER } from '../actions/bannerActions';

export default (state = {
  banners: [],
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
    default:
      return state;
  }
};
