const config = require('../config.json');
const jwt = require('jsonwebtoken');
const Role = require('../helpers/role');
const bcrypt = require('bcryptjs');
// const db = require('../helpers/database');
// const User = db.User;


// users hardcoded for simplicity, store in a db for production applications
// const users = [
//   {id: 1,username: 'admin',password: 'admin',firstName: 'Admin',lastName: 'User',role: Role.Admin},
//   {id: 2,username: 'user',password: 'user',firstName: 'Normal',lastName: 'User',role: Role.User}
// ];


// async function authenticate({username,password}) {
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     const token = jwt.sign({sub: user.id,role: user.role},config.secret);
//     const {password,...userWithoutPassword} = user;
//     return {
//       ...userWithoutPassword,
//       token
//     };
//   }
// }

// async function getAll() {
//   return users.map(u => {
//     const {password,...userWithoutPassword} = u;
//     return userWithoutPassword;
//   });
// }

// async function getById(id) {
//   const user = users.find(u => u.id === parseInt(id));
//   if (!user) return;
//   const {password,...userWithoutPassword} = user;
//   return userWithoutPassword;
// }

async function authenticate({username,password}) {
  const user = await User.findOne({username});
  if (user && bcrypt.compareSync(password,user.hash)) {
    const token = jwt.sign({sub: user.id},config.secret,{expiresIn: '7d'});
    return {
      ...user.toJSON(),
      token
    };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam) {
  // validate
  if (await User.findOne({username: userParam.username})) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password,10);
  }

  // save user
  await user.save();
}

async function update(id,userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (user.username !== userParam.username && await User.findOne({username: userParam.username})) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password,10);
  }

  // copy userParam properties to user
  Object.assign(user,userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};
