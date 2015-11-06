import express from 'express';
import path from 'path';
import qs from 'query-string';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Router, updateUrl, urlReducer as url } from '../../src';

import routes from './common/routes';

import Page from './common/components/Page';

const app = express();

const reducer = combineReducers({ url });

const handleRender = ( req, res ) => {
  const query = req.query ? `?${ qs.stringify( req.query )}` : null;

  const store = createStore( reducer );

  store.dispatch( updateUrl( req.path + query ));

  res.send( renderFullPage(
    renderToString(
      <Provider store={ store }>
        <Router routes={ routes } />
      </Provider>
    ),
    store.getState()
  ));
};

const renderFullPage = ( app, initialState ) => {
  return '<!DOCTYPE html>' +
    renderToStaticMarkup(
      <Page
        app={ app }
        initialState={ initialState }
      />
    );
};

app.get( '/react.js', ( req, res ) => {
  res.sendFile( path.join( __dirname, '..', '..', 'node_modules/react/dist/react.js' ));
});

app.get( '/redux.js', ( req, res ) => {
  res.sendFile( path.join( __dirname, '..', '..', 'node_modules/redux/dist/redux.js' ));
});

app.get( '/react-redux.js', ( req, res ) => {
  res.sendFile( path.join( __dirname, '..', '..', 'node_modules/react-redux/dist/react-redux.js' ));
});

app.get( '/client.dist.js', ( req, res ) => {
  res.sendFile( `${ __dirname }/client.dist.js` );
});

app.use( handleRender );

app.listen( 3000, () => {
  console.log( 'Listening for requests on http://localhost:3000' );
});
