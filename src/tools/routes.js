const express = require('express')
const controller = require('./controllers.js')

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    let result = await controller.getTools(req.query.tag)
    res.json(result)
  } catch {
    res.status(404)
  }
});

router.post('/', async (req, res, next) => {
  try {
    let result = await controller.saveTool(req.body)
    res.json(result)
  } catch {
    res.status(404)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let result = await controller.deleteTool(req.params.id)
    res.json(result)
  } catch {
    res.status(404)
  }
})

module.exports = router