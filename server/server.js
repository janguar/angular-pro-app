require('rootpath')();
const dotenv = require('dotenv');
const express = require("express");
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const basicAuth = require('./helpers/basic-auth');
const errorHandler = require('./helpers/error-handler');
const generateJwt = require('./helpers/jwt');
const morgan = require('morgan');
var cron = require('node-cron');
const sequelize = require('./helpers/database');
const User = require('./models/user.model');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// get config vars
dotenv.config();

cron.schedule('1 0 0 * * *',() => {
  console.log(Date.now(),' running a task every minute');
});

sequelize.sync(
  {
    // force: true,
    alter: true
  }
).then(() => {
  console.log("database ok!")
})

// authenticate with the database
// database
//   .sync()
//   // .authenticate()
//   // .sync()
//   .then(function (err) {
//     console.log("Connection established.");
//   })
//   .catch(function (err) {
//     console.log("Unable to connect to database: ",err);
//     // sequelize.close()
//   });

// // use basic HTTP auth to secure the api
// app.use(basicAuth);

// use JWT auth to secure the api
// app.use(generateJwt());

// api routes
app.use('/users',require('./controllers/users.controller'));

app.use('/test/:id',async (req,res) => {
  // create

  // User.create(req.body).then(() => {
  //   res.send(req.body + " is created!");
  //   console.log(req.body," are inserted");
  // }).catch(function (err) {
  //   console.log("ERROR: ",err);
  //   res.send("ERROR: ",err);
  //   // sequelize.close()
  // });

  // get all

  // const users = await User.findAll();
  // // console.log(users);
  // res.send(users);

  // get by id

  // const user = await User.findOne({where: {id: req.params.id}});
  // res.send(user);


  // update
  // const user = await User.findOne({where: {id: req.params.id}});
  // user.username = user.username + "UPDATED";
  // res.send(user);
  // await user.save();

  // delete

  await User.destroy({where: {id: req.params.id}});
  res.send("Deleted");
})

// global error handler
app.use(errorHandler);




// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port,function () {
  // access config var
  const token = process.env.TOKEN_KEY;
  console.warn("Token from .env ",token);
  console.log("Random Token. ",require('crypto').randomBytes(64).toString('hex'))
  console.log('Server listening on port ' + port);
  console.log("Connection string ",process.env.MONGODB_URI);
});

