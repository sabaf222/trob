"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllProducts = void 0;

var _Configs = _interopRequireDefault(require("../Configs/Configs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GetAllProducts = function GetAllProducts() {
  return _Configs["default"].get('/courses');
};

exports.GetAllProducts = GetAllProducts;