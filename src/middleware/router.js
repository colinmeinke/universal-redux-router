import getAction from '../helpers/getAction';
import popStateListener from '../helpers/popStateListener';
import { AFTER_CHANGE_PAGE_TO, CHANGE_PAGE_TO } from '../constants';
import { resolveActionCreator } from '../helpers/resolveActionCreator';

const getAfterAction = a => {
  const after = [ ...a ];
  const actionCreator = after.shift();
  return { actionCreator, after, type: AFTER_CHANGE_PAGE_TO };
};

const scrollToTop = () => {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
};

const router = ( routes, { isServer = false } = {}) => ({ dispatch, getState }) => {
  if ( !isServer ) {
    popStateListener( dispatch );
  }

  return next => action => {
    if ( action.type === CHANGE_PAGE_TO ) {
      const { options: { shouldAddToHistory, shouldScrollToTop }, to } = action;

      return getAction( to, routes ).then( newAction => {
        if ( !isServer && shouldAddToHistory ) {
          window.history.pushState({}, '', newAction.url );
        }

        if ( shouldScrollToTop ) {
          scrollToTop();
        }

        const result = next( newAction );

        if ( newAction.after.length ) {
          dispatch( getAfterAction( newAction.after ));
        }

        return result;
      }).catch( console.error );
    } else if ( action.type === AFTER_CHANGE_PAGE_TO ) {
      return resolveActionCreator( action.actionCreator, getState()).then( newAction => {
        const result = next( newAction );

        if ( action.after.length ) {
          dispatch( getAfterAction( action.after ));
        }

        return result;
      }).catch( console.error );
    }

    return next( action );
  };
};

export default router;
