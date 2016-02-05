import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from '../../src';

import routes from './common/routes';

import createStore from './common/createStore';

const { hash, pathname, search } = window.location;
const url = pathname + search + hash;

const store = createStore({ url });

render(
  <Provider store={ store }>
    <Router routes={ routes } />
  </Provider>,
  document.querySelector( '.app' )
);
