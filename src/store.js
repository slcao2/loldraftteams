import { createStore } from 'redux';
import masterReducer from './reducers';

const store = createStore(masterReducer);

export default store;
