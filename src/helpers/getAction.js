import getLocation from '../helpers/getLocation';
import getRoute from '../helpers/getRoute';
import updateUrl from '../actions/updateUrl';
import { CHANGE_PAGE_TO } from '../constants';

const getActions = ( url, actionCreators, data ) => {
  const actions = [
    updateUrl( url ),
  ];

  const keys = Object.keys( actionCreators );

  keys.forEach( k => {
    if ( k !== 'after' ) {
      if ( Array.isArray( actionCreators[ k ])) {
        actionCreators[ k ].forEach( actionCreator => {
          actions.push( actionCreator( data[ k ]));
        });
      } else {
        const actionCreator = actionCreators[ k ];
        actions.push( actionCreator( data[ k ]));
      }
    }
  });

  return actions;
};

const getAfter = actionCreators => {
  const after = [];

  if ( actionCreators.after ) {
    if ( Array.isArray( actionCreators.after )) {
      actionCreators.after.forEach( actionCreator => {
        after.push( actionCreator );
      });
    } else {
      after.push( actionCreators.after );
    }
  }

  return after;
};

const getAction = ( to, routes ) => {
  const { query, url } = getLocation( to );
  const { actionCreators, params } = getRoute( url, routes );

  const actions = getActions(
    url,
    actionCreators,
    { ...query, ...params }
  );

  const after = getAfter( actionCreators );

  return {
    actions,
    after,
    type: CHANGE_PAGE_TO,
    url,
  };
};

export default getAction;
