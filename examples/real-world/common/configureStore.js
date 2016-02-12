import { applyMiddleware, createStore } from 'redux';
import { getState, routerMiddleware, routerReducer } from '../../../src';

import * as reducers from './reducers';
import routes from './routes';

const reducer = routerReducer( reducers );

const configureStore = ({ isServer = false, url = '/' } = {}) => new Promise(( resolve, reject ) => {
  getState( url, routes, reducer ).then( state => {

    const middleware = applyMiddleware(
      routerMiddleware( routes, { isServer })
    );

    resolve( createStore( reducer, state, middleware ));

  }).catch( reject );

});

export default configureStore;
