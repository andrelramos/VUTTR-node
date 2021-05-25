const express = require('express');
const controller = require('./controllers');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const result = await controller.getTools(req.query.tag);
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await controller.saveTool(req.body);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await controller.deleteTool(req.params.id);
  res.json(result);
});

module.exports = router;
