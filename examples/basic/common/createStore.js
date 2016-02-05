import { applyMiddleware, createStore } from 'redux';
import { getState, routerMiddleware, routerReducer } from '../../../src';

import * as reducers from './reducers';
import routes from './routes';

const reducer = routerReducer( reducers );

export default ({ isServer = false, url = '/' } = {}) => {
  const state = getState( url, routes, reducer );
  const middleware = applyMiddleware( routerMiddleware( routes, { isServer }));
  return createStore( reducer, state, middleware );
};
