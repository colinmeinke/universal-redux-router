'use strict';

module.exports = {
  externals: {
    react: 'React',
    'react-redux': 'ReactRedux',
    redux: 'Redux',
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.js$/,
    }],
  },
};
