import getLocation from './getLocation'
import getRoute from './getRoute'
import updateUrl from '../actions/updateUrl'
import { CHANGE_PAGE_TO } from '../constants'
import { getResolvedActionCreators } from './resolveActionCreator'

const getActions = (url, actionCreators, data) => new Promise((resolve, reject) => {
  const actionCreatorsMap = new Map()

  actionCreatorsMap.set(updateUrl, url)

  Object.keys(actionCreators).forEach(k => {
    if (k !== 'after') {
      if (Array.isArray(actionCreators[ k ])) {
        actionCreators[ k ].forEach(actionCreator => {
          actionCreatorsMap.set(actionCreator, data[ k ])
        })
      } else {
        actionCreatorsMap.set(actionCreators[ k ], data[ k ])
      }
    }
  })

  Promise.all(getResolvedActionCreators(actionCreatorsMap))
    .then(resolve)
    .catch(reject)
})

const getAfter = actionCreators => {
  const after = []

  if (actionCreators.after) {
    if (Array.isArray(actionCreators.after)) {
      actionCreators.after.forEach(actionCreator => {
        after.push(actionCreator)
      })
    } else {
      after.push(actionCreators.after)
    }
  }

  return after
}

const getAction = (to, routes) => new Promise((resolve, reject) => {
  const { query, url } = getLocation(to)
  const { actionCreators, params } = getRoute(url, routes)

  getActions(url, actionCreators, { ...query, ...params })
    .then(actions => resolve({
      actions,
      after: getAfter(actionCreators),
      type: CHANGE_PAGE_TO,
      url
    }))
    .catch(reject)
})

export default getAction
