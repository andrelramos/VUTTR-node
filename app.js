import mongoose from "mongoose";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var toolsRouter = require('./src/tools/routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tools', toolsRouter);

mongoose.connect('mongodb://localhost:27017/test')  // TODO deixar link em um env

module.exports = app;
