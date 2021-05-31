const express = require('express');
const controller = require('./controllers');
const errors = require('../utils/errors');
const oauth = require('./oauth/oauthServer');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const result = await controller.saveUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof errors.InvalidSchema) {
      res.status(400).json(err.details);
    } else {
      res.sendStatus(500);
    }
  }
});

router.post('/login', oauth.token());

module.exports = router;
