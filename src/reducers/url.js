import { UPDATE_URL } from '../constants';

const url = ( state = '/', action = {}) => {
  switch ( action.type ) {
    case UPDATE_URL:
      return action.url;
    default:
      return state;
  }
};

export default url;
