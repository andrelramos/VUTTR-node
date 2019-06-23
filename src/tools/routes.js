import express from 'express'
import {saveTool, getTools, deleteTool}  from './controllers'

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let result = await getTools(req.query.tag)
  res.json(result)
});

router.post('/', async (req, res, next) => {
  let result = await saveTool(req.body)
  res.json(result)
})

router.delete('/:id', async (req, res, next) => {
  let result = await deleteTool(req.params.id)
  res.json(result)
})

module.exports = router