import { combineReducers } from 'redux';

import url from './url';
import { CHANGE_PAGE_TO } from '../constants';

const router = reducers => {
  const rootReducer = combineReducers({ ...reducers, url });

  const actionCreatorReducer = ( state, actionCreator ) => {
    const action = actionCreator( state );
    return rootReducer( state, action );
  };

  const batchReducer = ( state, action ) => {
    switch ( action.type ) {
      case CHANGE_PAGE_TO:
        let newState = action.actions.reduce( rootReducer, state );

        if ( action.after.length ) {
          newState = action.after.reduce( actionCreatorReducer, newState );
        }

        return newState;
      default:
        return rootReducer( state, action );
    }
  };

  return batchReducer;
};

export default router;
