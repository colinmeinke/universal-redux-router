import express from 'express'
import path from 'path'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Router } from './universal-redux-router'

import configureStore from './common/configureStore'
import routes from './common/routes'
import { dishes } from './common/config'

import Page from './common/components/Page'

const app = express()

const handleApi = (req, res, next) => {
  const { country, isVegetarian = 'false' } = req.query

  if (req.url.includes('/api/')) {
    const filteredDishes = dishes.filter(dish => (
      (country === dish.country) &&
      (isVegetarian === 'false' || (isVegetarian === 'true' && dish.isVegetarian))
    ))

    res.json({ dishes: filteredDishes })
  } else {
    next()
  }
}

const handleRender = (req, res) => {
  configureStore({ isServer: true, url: req.url }).then(store => {
    res.send(renderFullPage(
      renderToString(
        <Provider store={store}>
          <Router routes={routes} />
        </Provider>
      )
    ))
  }).catch(console.error.bind(console))
}

const renderFullPage = (app) => {
  return '<!DOCTYPE html>' +
    renderToStaticMarkup(<Page app={app} />)
}

app.get('/react.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/react/dist/react.js'))
})

app.get('/redux.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/redux/dist/redux.js'))
})

app.get('/react-redux.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/react-redux/dist/react-redux.js'))
})

app.get('/client.dist.js', (req, res) => {
  res.sendFile(`${__dirname}/client.dist.js`)
})

app.use(handleApi)
app.use(handleRender)

app.listen(3000, () => {
  console.log('Listening for requests on http://localhost:3000')
})
