'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('./controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  var result = await (0, _controllers.getTools)(req.query.tag);
  res.send(JSON.stringify(result));
});

router.post('/', async function (req, res, next) {
  var result = await (0, _controllers.saveTool)(req.body);
  res.send(JSON.stringify(result));
});

router.delete('/:id', async function (req, res, next) {
  var result = await (0, _controllers.deleteTool)(req.params.id);
  res.send(JSON.stringify(result));
});

module.exports = router;