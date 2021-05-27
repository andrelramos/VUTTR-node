const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
const toolsRouter = require('./src/tools/routes');
const swaggerDocument = require('./swagger.json');

// Application settings
const app = express();
const port = 3000;

// Setting up local environment variables
if (process.env.ENV !== 'PRODUCTION') {
  dotenv.config();
}

// Configs middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Application routes
app.use('/tools', toolsRouter);

// Connection with database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Starting express server
app.listen(port);

module.exports = app;
