"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost:27017/test');

var Tool = _mongoose2.default.model("Tool", {
    title: String,
    link: String,
    description: String,
    tags: [String]
});