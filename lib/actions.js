'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUrl = undefined;

var _constants = require('./constants');

var updateUrl = function updateUrl(url) {
  return { type: _constants.UPDATE_URL, url: url };
};

exports.updateUrl = updateUrl;