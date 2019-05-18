import { createStore } from 'redux';
import masterReducer from './reducers';

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const store = createStore(masterReducer);
/* eslint-enable */

export default store;
