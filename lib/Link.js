'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Link = function Link(_ref) {
  var children = _ref.children;
  var url = _ref.url;

  var props = _objectWithoutProperties(_ref, ['children', 'url']);

  return _react2.default.createElement(
    'a',
    _extends({ href: url }, props),
    children
  );
};

var ConnectedLink = (0, _reactRedux.connect)(function () {
  return {};
}, function (dispatch) {
  return {
    onClick: function onClick(e) {
      e.preventDefault();
      var _e$target = e.target;
      var hash = _e$target.hash;
      var pathname = _e$target.pathname;
      var search = _e$target.search;

      var url = pathname + search + hash;
      window.history.pushState({}, '', url);
      dispatch((0, _actions.updateUrl)(url));
    }
  };
})(Link);

exports.Link = Link;
exports.default = ConnectedLink;