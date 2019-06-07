'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.getAll = async function () {
    result = await _models2.default.find({}).exec();
    return result;
};

controller.saveTool = async function () {
    var tool = new _models2.default({ title: 'Zildjian', link: 'haha', description: "bbbbb", tags: ["t", "a", "g"] });
    await tool.save();
    console.log('foi salvo');
};

exports.default = controller;