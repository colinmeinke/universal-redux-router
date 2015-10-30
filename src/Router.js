import React from 'react';
import { connect } from 'react-redux';

const Router = ({ routes, url }) => {
  return routes( url );
};

const ConnectedRouter = connect( state => ({
  url: state.url,
}))( Router );

export { Router };
export default ConnectedRouter;
