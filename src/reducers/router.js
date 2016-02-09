import { combineReducers } from 'redux';

import url from './url';
import { CHANGE_PAGE_TO } from '../constants';

const router = reducers => {
  const rootReducer = combineReducers({ ...reducers, url });

  const getNewStateFromAction = ( state, action ) => {
    let newState = rootReducer( state, action );

    if ( action.then ) {
      newState = getNewStateFromActionCreator( newState, action.then );
    }

    return newState;
  };

  const getNewStateFromActionCreator = ( state, actionCreator ) => {
    const action = actionCreator( state );

    if ( action ) {
      return getNewStateFromAction( state, action );
    }

    return state;
  };

  const batchReducer = ( state, action ) => {
    switch ( action.type ) {
      case CHANGE_PAGE_TO:
        let newState = { ...state };

        action.actions.forEach( a => {
          newState = getNewStateFromAction( newState, a );
        });

        return newState;
      default:
        return getNewStateFromAction( state, action );
    }
  };

  return batchReducer;
};

export default router;
