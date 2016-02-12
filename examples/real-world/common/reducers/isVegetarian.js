import { UPDATE_IS_VEGETARIAN } from '../actions';

const isVegetarian = ( state = false, action ) => {
  switch ( action.type ) {
    case UPDATE_IS_VEGETARIAN:
      return action.isVegetarian;
    default:
      return state;
  }
};

export default isVegetarian;
