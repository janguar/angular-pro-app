const express = require("express");

const UserRouter = require('./user/user.router');
const ErrorHandler = require('./error/error.handler');
const ArticleRouter = require('./article/article.router');
const morgan = require('morgan') // logging
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const AuthRouter = require("./auth/auth.router");
// translations
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  })



const app = express();
app.use(express.json());
app.use(middleware.handle(i18next));

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
app.use(AuthRouter);


app.use(ErrorHandler);

module.exports = app;
