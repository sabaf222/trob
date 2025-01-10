"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllProducts = void 0;

var _Configs = _interopRequireDefault(require("../Configs/Configs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllProducts = function getAllProducts() {
  return _Configs["default"].get('/courses');
};

exports.getAllProducts = getAllProducts;