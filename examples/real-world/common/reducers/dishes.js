import { UPDATE_DISHES } from '../actions';

const dishes = ( state = [], action ) => {
  switch ( action.type ) {
    case UPDATE_DISHES:
      return action.dishes;
    default:
      return state;
  }
};

export default dishes;
