"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tool = _mongoose2.default.model("Tool", {
    title: String,
    link: String,
    description: String,
    tags: [String]
});

exports.default = Tool;