"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTools = getTools;
exports.saveTool = saveTool;
exports.deleteTool = deleteTool;

var _mongoose = require("mongoose");

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getTools() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var result = {};
    console.log(tag);
    try {
        if (tag) {
            result = _models2.default.find({ "tags": { "$in": [tag] } }).exec();
        } else {
            result = _models2.default.find().exec();
        }
    } catch (e) {
        console.log(e);
        result = { "error": "Wasn't possible to find tools." };
    }
    return result;
}

async function saveTool(toolData) {
    var result = {};

    try {
        var tool = new _models2.default(toolData);
        result = await tool.save();
    } catch (e) {
        console.log(e);
        result = { "error": "Wasn't possible save the new tool." };
    }

    return result;
}

async function deleteTool(toolId) {
    var result = {};

    try {
        result = _models2.default.findByIdAndDelete({ "_id": new _mongoose.Types.ObjectId(toolId) }).exec();
    } catch (e) {
        console.log(e);
        result = { "error": "Wasn't possible save the new tool." };
    }

    return result;
}