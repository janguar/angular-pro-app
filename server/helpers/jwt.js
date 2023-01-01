const jwt = require('express-jwt');
const config = require('config.json');
const userService = require('../services/user.service');

module.exports = generateJwt;

function generateJwt() {
  const {secret} = config;
  return jwt({secret,algorithms: ['HS256']}).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register'
    ]
  });
}


async function isRevoked(req,payload,done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null,true);
  }

  done();
};
