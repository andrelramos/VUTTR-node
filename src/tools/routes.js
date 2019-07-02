const express = require('express')
const parsers = require('../parsers')
const controller = require('./controllers.js')

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let result = await controller.getTools(req.query.tag)
  parsers.responseStatusParser(res, result)
  res.json(result)
});

router.post('/', async (req, res, next) => {
  let result = await controller.saveTool(req.body)
  parsers.responseStatusParser(res, result)
  res.json(result)
})

router.delete('/:id', async (req, res, next) => {
  let result = await controller.deleteTool(req.params.id)
  responseStatusParser(res, result)
  res.json(result)
})

module.exports = router