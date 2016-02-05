import getAction from '../helpers/getAction';
import popStateListener from '../helpers/popStateListener';
import { CHANGE_PAGE_TO } from '../constants';

const router = ( routes, { isServer = false } = {}) => ({ dispatch }) => {
  if ( !isServer ) {
    popStateListener( dispatch );
  }

  return next => initialAction => {
    const { options: { shouldAddToHistory }, to, type } = initialAction;

    if ( type === CHANGE_PAGE_TO ) {
      const action = getAction( to, routes );

      if ( !isServer && shouldAddToHistory ) {
        window.history.pushState({}, '', action.url );
      }

      return next( action );
    }

    return next( initialAction );
  };
};

export default router;
