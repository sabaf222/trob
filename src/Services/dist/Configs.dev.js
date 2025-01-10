"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localStorageData = JSON.parse(localStorage.getItem("user"));

var apiRequists = _axios["default"].create({
  baseURL: "http://localhost:4000/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Beaere ".concat(localStorageData.token)
  }
});

var _default = apiRequists;
exports["default"] = _default;