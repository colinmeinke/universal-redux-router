const resolveActionCreator = (actionCreator, data) => Promise.resolve(
  actionCreator(data)
)

const getResolvedActionCreators = actionCreatorsMap => {
  const resolved = []

  actionCreatorsMap.forEach((data, actionCreator) => {
    resolved.push(resolveActionCreator(actionCreator, data))
  })

  return resolved
}

export { resolveActionCreator, getResolvedActionCreators }
