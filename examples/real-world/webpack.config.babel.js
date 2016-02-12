import config from '../../webpack.config.babel';

export default {
  ...config,
  externals: {
    ...config.externals,
    redux: 'Redux',
  },
  module: {
    loaders: [
      ...config.module.loaders,
      { loaders: [ 'json' ], test: /\.json$/ },
    ],
  },
};
