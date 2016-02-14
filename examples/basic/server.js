import express from 'express';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { changePageTo, Router } from '../../src';

import routes from './common/routes';

import configureStore from './common/configureStore';

import Page from './common/components/Page';

const app = express();

const handleRender = ( req, res ) => {
  configureStore({ isServer: true, url: req.url }).then( store => {
    res.send( renderFullPage(
      renderToString(
        <Provider store={ store }>
          <Router routes={ routes } />
        </Provider>
      )
    ));
  }).catch( console.error.bind( console ));
};

const renderFullPage = ( app ) => {
  return '<!DOCTYPE html>' +
    renderToStaticMarkup( <Page app={ app } /> );
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
