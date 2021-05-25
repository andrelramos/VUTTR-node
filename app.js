const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')
const swaggerUi = require('swagger-ui-express')
const toolsRouter = require('./src/tools/routes')
const swaggerDocument = require('./swagger.json')
const dotenv = require('dotenv')

// Application settings
const app = express()
const port = 3000
dotenv.config()

// Configs middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Application routes
app.use('/tools', toolsRouter)

// Connection with database
mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true})

// Starting express server
app.listen(port, () => console.log(`Running server on port ${port}`))
