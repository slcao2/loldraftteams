/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import masterReducer from './reducers';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
  masterReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
registerServiceWorker();
