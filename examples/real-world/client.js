import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from './universal-redux-router';

import routes from './common/routes';

import configureStore from './common/configureStore';

const { hash, pathname, search } = window.location;
const url = pathname + search + hash;

configureStore({ url }).then( store => {
  render(
    <Provider store={ store }>
      <Router routes={ routes } />
    </Provider>,
    document.querySelector( '.app' )
  );
}).catch( console.error.bind( console ));
