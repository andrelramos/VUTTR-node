const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')
const swaggerUi = require('swagger-ui-express')
const toolsRouter = require('./src/tools/routes')
const swaggerDocument = require('./swagger.json')

const app = express()
const port = 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/tools', toolsRouter)

mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true})

app.listen(port, () => console.log(`Running server on port ${port}`))
