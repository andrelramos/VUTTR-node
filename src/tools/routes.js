import express from 'express'
import toolsController  from './controllers'

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log(toolsController.getAll())
  res.send(JSON.stringify(toolsController.getAll()));
});

router.post('/', (req, res, next) => {
  toolsController.saveTool()
  res.send("Foi salvo")
})

module.exports = router