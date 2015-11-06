import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Router, updateUrl, urlReducer as url } from '../../src';

import routes from './common/routes';

const initialState = window.__INITIAL_STATE__;

const reducer = combineReducers({ url });

const store = createStore( reducer, initialState );

window.addEventListener( 'popstate', () => {
  const { hash, pathname, search } = window.location;
  const url = pathname + search + hash;
  store.dispatch( updateUrl( url ));
});

render(
  <Provider store={ store }>
    <Router routes={ routes } />
  </Provider>,
  document.querySelector( '.app' )
);
