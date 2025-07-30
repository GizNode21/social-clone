"use strict";

/*var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
const css = require("./index.css");*/
import _react from "react";
import _client from "react-dom";
import { Provider as _reactRedux } from "react-redux";
import { BrowserRouter as _reactRouterDom } from "react-router-dom";
import App from "./App.js";
//const configureStore = import("./store/index.mjs").then(module => module.createStore);
import configureStore from "./store/index.js";
var store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  try {
    window.store = store;
  } catch (err) {
    console.log(err);
  }
}
function Root() {
  return /*#__PURE__*/_react["default"].createElement(_reactRedux, {
    store: store
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom, null, /*#__PURE__*/_react["default"].createElement(App, null)));
}
if (typeof document !== "undefined") {
  var root = document.getElementById('root');
  if (root) {
    _client.render(/*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode, null, /*#__PURE__*/_react["default"].createElement(Root, null)), root);
  }
}