const jwt = require('jsonwebtoken');
const config = require('config.json');

module.exports = generateJwt;

function generateJwt() {
  const {secret} = config;
  return jwt({secret,algorithms: ['HS256']}).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate'
    ]
  });
}

