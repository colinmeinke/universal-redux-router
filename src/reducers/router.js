import { combineReducers } from 'redux'

import url from './url'
import { CHANGE_PAGE_TO } from '../constants'

const router = reducers => {
  const rootReducer = combineReducers({ ...reducers, url })

  const batchReducer = (state, action) => {
    switch (action.type) {
      case CHANGE_PAGE_TO:
        return action.actions.reduce(rootReducer, state)
      default:
        return rootReducer(state, action)
    }
  }

  return batchReducer
}

export default router
