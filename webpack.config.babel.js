export default {
  externals: {
    react: 'React',
    'react-redux': 'ReactRedux'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      test: /\.js$/
    }]
  }
}
