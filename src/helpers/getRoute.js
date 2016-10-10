const match = (pathName, routePath) => {
  const keys = routePath.replace(/(^\/|\/$)/, '').split('/')
  const values = pathName.replace(/(^\/|\/$)/, '').split('/')

  let i = 0
  let k

  for (k of keys) {
    if ((k !== '*') && (!k.startsWith(':'))) {
      if (k !== values[ i ]) {
        return false
      }
    }

    i++
  }

  if (values[ i ] && k !== '*') {
    return false
  }

  return true
}

const getActionCreators = route => {
  const actionCreators = {}

  for (const part of route) {
    if (typeof part === 'object' && !part.props) {
      Object.assign(actionCreators, part)
    }
  }

  return actionCreators
}

const getComponent = route => route[ route.length - 1 ]

const getParams = (routePath, pathName) => {
  const params = {}
  const keys = routePath.split('/')
  const values = pathName.split('/')

  keys.forEach((k, i) => {
    if (k.startsWith(':') && values[ i ]) {
      params[ k.substr(1) ] = values[ i ]
    }
  })

  return params
}

const getRoute = (url, routes) => {
  const pathName = `/${url.split('?')[ 0 ].replace(/(^\/|\/$)/, '')}`

  for (const route of routes) {
    const routePath = `/${route
      .filter(part => [ 'object', 'array' ].indexOf(typeof part) === -1)
      .map(part => part.replace(/(^\/|\/$)/, ''))
      .join('/')
    }`

    if (match(pathName, routePath)) {
      return {
        actionCreators: getActionCreators(route),
        component: getComponent(route),
        params: getParams(routePath, pathName)
      }
    }
  }

  return null
}

export { match, getActionCreators, getComponent, getParams }

export default getRoute
