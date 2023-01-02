require('rootpath')();
const dotenv = require('dotenv');
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
// const basicAuth = require('./helpers/basic-auth');
const errorHandler = require('./helpers/error-handler');
const generateJwt = require('./helpers/jwt');
const morgan = require('morgan');
const cron = require('node-cron');
const sequelize = require('./helpers/database');
const User = require('./models/user.model');
const app = express();

sequelize.sync(
  {
    force: true
    // alter: true
  }
).then(async () => {
  console.log("database ok!");
  for (let i = 1; i <= 25; i++) {
    const user = {
      username: `user${i}`,
      email: `user${i}@mail.com`,
      password: 'P4ssword'
    }
    await User.create(user);
  }
})

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

function InvalidIdException() {
  this.status = 400;
  this.message = 'Invalid ID';
}

function UserNotFoundException() {
  this.status = 404;
  this.message = 'User not found';
}


// api routes
// app.use('/users',require('./controllers/users.controller'));

/**
 */
app.post('/users',async (req,res) => {
  await User.create(req.body);
  res.send("success");
})

/**
 */
app.get('/users',async (req,res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
    size = sizeAsNumber;
  }

  const usersWithCount = await User.findAndCountAll({
    limit: size,
    offset: page * size
  });
  res.send({
    content: usersWithCount.rows,
    totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size))
  });
})

/**
 */
app.get('/users/:id',async (req,res,next) => {
  const id = Number.parseInt(req.params.id);
  if (Number.isNaN(id)) {
    next(new InvalidIdException());
  }
  const user = await User.findOne({where: {id: id}});
  if (!user) {
    next(new UserNotFoundException());
  }
  res.send(user);
})

app.put('/users/:id',async (req,res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  user.username = req.body.username;
  await user.save();
  res.send('updated');
})

app.delete('/users/:id',async (req,res) => {
  const id = req.params.id;
  await User.destroy({where: {id: id}});
  res.send('removed');
})


// global error handler
// app.use(errorHandler);

app.use((err,req,res,next) => {
  res
    .status(err.status)
    .send(
      {
        message: err.message,
        timestamp: Date.now(),
        path: req.originalUrl
      });
})




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

