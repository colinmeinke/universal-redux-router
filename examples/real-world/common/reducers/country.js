import { UPDATE_COUNTRY } from '../actions'

import { countries } from '../config'

const country = (state = countries[ 0 ], action) => {
  switch (action.type) {
    case UPDATE_COUNTRY:
      return action.country
    default:
      return state
  }
}

export default country
