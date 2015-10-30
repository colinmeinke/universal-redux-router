'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
  var children = _ref.children;
  var onClick = _ref.onClick;
  var url = _ref.url;

  return _react2.default.createElement(
    'a',
    { href: url, onClick: onClick },
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