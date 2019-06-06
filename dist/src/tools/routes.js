'use strict';

var _express = require('express');

var _controllers = require('./controllers');

var router = _express.express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send((0, _controllers.get_all_tools)());
});

module.exports = router;