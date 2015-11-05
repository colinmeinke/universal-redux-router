(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactRedux"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactRedux"], factory);
	else if(typeof exports === 'object')
		exports["UniversalReduxRouter"] = factory(require("React"), require("ReactRedux"));
	else
		root["UniversalReduxRouter"] = factory(root["React"], root["ReactRedux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.urlReducer = exports.updateUrl = exports.UPDATE_URL = exports.Router = exports.Link = undefined;

	var _Link = __webpack_require__(1);

	var _Link2 = _interopRequireDefault(_Link);

	var _Router = __webpack_require__(6);

	var _Router2 = _interopRequireDefault(_Router);

	var _urlReducer = __webpack_require__(7);

	var _urlReducer2 = _interopRequireDefault(_urlReducer);

	var _constants = __webpack_require__(5);

	var _actions = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Link = _Link2.default;
	exports.Router = _Router2.default;
	exports.UPDATE_URL = _constants.UPDATE_URL;
	exports.updateUrl = _actions.updateUrl;
	exports.urlReducer = _urlReducer2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Link = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(3);

	var _actions = __webpack_require__(4);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateUrl = undefined;

	var _constants = __webpack_require__(5);

	var updateUrl = function updateUrl(url) {
	  return { type: _constants.UPDATE_URL, url: url };
	};

	exports.updateUrl = updateUrl;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var UPDATE_URL = '@@universalReduxRouter/updateUrl';

	exports.UPDATE_URL = UPDATE_URL;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Router = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(3);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(5);

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

/***/ }
/******/ ])
});
;