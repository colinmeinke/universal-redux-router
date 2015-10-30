'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function Router(_ref) {
  var routes = _ref.routes;
  var url = _ref.url;

  return routes(url);
};

var ConnectedRouter = (0, _reactRedux.connect)(function (state) {
  return {
    url: state.url
  };
})(Router);

exports.Router = Router;
exports.default = ConnectedRouter;