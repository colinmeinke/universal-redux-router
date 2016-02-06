import getAction from '../helpers/getAction';
import popStateListener from '../helpers/popStateListener';
import { CHANGE_PAGE_TO } from '../constants';

const scrollToTop = () => {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
};

const router = ( routes, { isServer = false } = {}) => ({ dispatch }) => {
  if ( !isServer ) {
    popStateListener( dispatch );
  }

  return next => initialAction => {
    const { type } = initialAction;

    if ( type === CHANGE_PAGE_TO ) {
      const { options: { shouldAddToHistory, shouldScrollToTop }, to } = initialAction;

      const action = getAction( to, routes );

      if ( !isServer && shouldAddToHistory ) {
        window.history.pushState({}, '', action.url );
      }

      if ( shouldScrollToTop ) {
        scrollToTop();
      }

      return next( action );
    }

    return next( initialAction );
  };
};

export default router;
