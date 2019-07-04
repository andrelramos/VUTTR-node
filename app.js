var mongoose = require('mongoose')
var express = require('express')
var logger = require('morgan')
var swaggerUi = require('swagger-ui-express')
var toolsRouter = require('./src/tools/routes')
var swaggerDocument = require('./swagger.json')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/tools', toolsRouter)

mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true})

module.exports = app
