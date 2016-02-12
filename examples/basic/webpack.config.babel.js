import config from '../../webpack.config.babel';

export default {
  ...config,
  externals: {
    ...config.externals,
    redux: 'Redux',
  },
};
