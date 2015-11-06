'use strict';

module.exports = {
  externals: {
    react: 'React',
    'react-redux': 'ReactRedux',
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.js$/,
    }],
  },
};
