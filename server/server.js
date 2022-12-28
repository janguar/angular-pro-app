require('rootpath')();
const dotenv = require('dotenv');
const express = require("express");
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const basicAuth = require('./helpers/basic-auth');
const errorHandler = require('./helpers/error-handler');
const generateJwt = require('./helpers/jwt');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// get config vars
dotenv.config();

// // use basic HTTP auth to secure the api
// app.use(basicAuth);

// use JWT auth to secure the api
// app.use(generateJwt());

// api routes
app.use('/users',require('./controllers/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port,function () {
  // access config var
  const token = process.env.TOKEN_SECRET;
  console.warn("Token from .env ",token);
  console.log("Random Token. ",require('crypto').randomBytes(64).toString('hex'))
  console.log('Server listening on port ' + port);
});

