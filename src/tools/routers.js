const express = require('express');
const controller = require('./controllers');
const errors = require('../utils/errors');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const result = await controller.getTools(req.query.tag);
  res.json(result);
});

router.post('/', async (req, res) => {
  try {
    const result = await controller.saveTool(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof errors.InvalidSchema) {
      res.status(400).json(err.details);
    } else {
      res.sendStatus(500);
    }
  }
});

router.delete('/:id', async (req, res) => {
  await controller.deleteTool(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
