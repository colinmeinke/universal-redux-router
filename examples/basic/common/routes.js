import qs from 'query-string';
import React from 'react';

import About from './components/About';
import Hello from './components/Hello';
import Home from './components/Home';
import NotFound from './components/NotFound';

const routes = url => {
  const path = url.split( '?' )[ 0 ];
  const query = qs.parse( qs.extract( url ));

  switch ( path ) {
    case '/about':
      return <About />;
    case '/hello':
      return <Hello name={ query.name } />;
    case '/':
      return <Home />;
    default:
      return <NotFound />;
  }
};

export default routes;
