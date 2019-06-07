'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(_controllers2.default.getAll());
  res.send(JSON.stringify(_controllers2.default.getAll()));
});

router.post('/', function (req, res, next) {
  _controllers2.default.saveTool();
  res.send("Foi salvo");
});

module.exports = router;