/* global fetch */

import 'isomorphic-fetch'

import getLocation from '../../universal-redux-router/helpers/getLocation'

const UPDATE_DISHES = 'UPDATE_DISHES'

const getDishes = ({ country, isVegetarian }) => new Promise((resolve, reject) => {
  const to = [ 'api/dishes', { country, isVegetarian } ]
  const { url } = getLocation(to)

  fetch(`http://localhost:3000${url}`, {
    method: 'GET'
  }).then(response => {
    return response.json()
  }).then(({ dishes }) => {
    resolve({ type: UPDATE_DISHES, dishes })
  }).catch(error => {
    reject(error)
  })
})

export { UPDATE_DISHES, getDishes }
