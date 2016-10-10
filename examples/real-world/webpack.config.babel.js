export default {
  externals: {
    react: 'React',
    'react-redux': 'ReactRedux',
    redux: 'Redux'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/
      },
      { loaders: [ 'json' ], test: /\.json$/ }
    ]
  }
}
