"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//const css = require("./index.css");

var createStore = require("./store/index");
var store = createStore();
if (process.env.NODE_ENV !== 'production') {
  try {
    window.store = store;
  } catch (err) {
    console.log("window is undefined");
  }
}
function Root() {
  return /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react["default"].createElement(_App["default"], null)));
}
var root = _client["default"].createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode, null, /*#__PURE__*/_react["default"].createElement(Root, null)));
