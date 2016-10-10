import getAction from './getAction'
import { resolveActionCreator } from './resolveActionCreator'

const getState = (url, routes, reducer, initialState = {}) => new Promise((resolve, reject) => {
  // eslint-disable-next-line promise/param-names
  const actionCreatorsReducer = (state, actionCreators) => new Promise((res, rej) => {
    if (actionCreators.length) {
      const actionCreator = actionCreators.shift()

      resolveActionCreator(actionCreator, state)
        .then(action => {
          actionCreatorsReducer(reducer(state, action), actionCreators)
            .then(res)
            .catch(rej)
        })
        .catch(rej)
    } else {
      resolve(state)
    }
  })

  getAction(url, routes).then(action => {
    const state = reducer(initialState, action)

    if (action.after.length) {
      actionCreatorsReducer(state, action.after)
        .then(resolve)
        .catch(reject)
    } else {
      resolve(state)
    }
  }).catch(reject)
})

export default getState
