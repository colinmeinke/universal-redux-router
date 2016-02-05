import getAction from './getAction';

const getState = ( url, routes, reducer ) => {
  const action = getAction( url, routes );
  return reducer({}, action );
};

export default getState;
