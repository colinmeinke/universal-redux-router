'use strict';

const config = require( '../../webpack.config.js' );

config.externals.redux = 'Redux';

module.exports = config;
