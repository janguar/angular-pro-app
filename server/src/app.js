const express = require("express");

const UserRouter = require('./user/UserRouter');
const ErrorHandler = require('./error/ErrorHandler');
const ArticleRouter = require('./article/ArticleRouter');
const morgan = require('morgan') // logging

const app = express();
app.use(express.json());

// logging
app.use(
  morgan(
    "combined",
    "[:date] Started :method :url for :remote-addr",
    {immediate: true}
  ))
// logging

app.use(UserRouter);
app.use(ArticleRouter);

app.use(ErrorHandler);

module.exports = app;
