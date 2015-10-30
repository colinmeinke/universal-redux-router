'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var urlReducer = function urlReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  switch (action.type) {
    case _constants.UPDATE_URL:
      return action.url;
    default:
      return state;
  }
};

exports.default = urlReducer;