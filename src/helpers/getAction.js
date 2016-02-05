import getLocation from '../helpers/getLocation';
import getRoute from '../helpers/getRoute';
import updateUrl from '../actions/updateUrl';
import { CHANGE_PAGE_TO } from '../constants';

const getActionList = ( url, actionCreators, data ) => {
  const actions = [
    updateUrl( url ),
  ];

  const keys = Object.keys( actionCreators );

  keys.forEach( k => {
    if ( Array.isArray( actionCreators[ k ])) {
      actionCreators[ k ].forEach( actionCreator => {
        actions.push( actionCreator( data[ k ]));
      });
    } else {
      const actionCreator = actionCreators[ k ];
      actions.push( actionCreator( data[ k ]));
    }
  });

  return actions;
};

const getAction = ( to, routes ) => {
  const { query, url } = getLocation( to );
  const { actionCreators, params } = getRoute( url, routes );

  const actions = getActionList(
    url,
    actionCreators,
    { ...query, ...params }
  );

  return {
    actions,
    type: CHANGE_PAGE_TO,
    url,
  };
};

export default getAction;
