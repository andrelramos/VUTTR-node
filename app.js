var mongoose = require('mongoose')
var express = require('express')
var logger = require('morgan')
var swaggerUi = require('swagger-ui-express')
var indexRouter = require('./routes/index')
var toolsRouter = require('./src/tools/routes')
var swaggerDocument = require('./swagger.json')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', indexRouter)
app.use('/tools', toolsRouter)

mongoose.connect('mongodb://localhost:27017/test',  {useNewUrlParser: true})  // TODO deixar link em um env

module.exports = app
