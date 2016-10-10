import { DISHES_LOADED, DISHES_LOADING } from '../actions'

const areDishesLoading = (state = false, action) => {
  switch (action.type) {
    case DISHES_LOADED:
      return false
    case DISHES_LOADING:
      return true
    default:
      return state
  }
}

export default areDishesLoading
