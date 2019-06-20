import express from 'express'
import {saveTool, getTools, deleteTool}  from './controllers'

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let result = await getTools(req.query.tag)
  res.send(JSON.stringify(result));
});

router.post('/', async (req, res, next) => {
  let result = await saveTool(req.body)
  res.send(JSON.stringify(result))
})

router.delete('/:id', async (req, res, next) => {
  let result = await deleteTool(req.params.id)
  res.send(JSON.stringify(result))
})

module.exports = router